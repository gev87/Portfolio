import { getRecords, type Record } from './portfolio';

export interface Hit {
  title: string;
  href?: string;
  kind: Record['kind'];
  /** The sentence the match was found in, for context. */
  snippet: string;
}

/*
  Words that match nearly every entry and so tell us nothing about relevance.
  Deliberately short: over-filtering a 17-entry corpus hurts more than it helps.
*/
const STOP = new Set([
  'the', 'and', 'for', 'with', 'has', 'have', 'had', 'was', 'were', 'did', 'does',
  'what', 'which', 'who', 'whom', 'when', 'where', 'how', 'why', 'any', 'you',
  'your', 'his', 'him', 'her', 'their', 'that', 'this', 'these', 'those', 'are',
  'can', 'could', 'would', 'should', 'about', 'from', 'work', 'worked', 'working',
  'experience', 'tell', 'know', 'much', 'many', 'been', 'does', 'gevorg',
]);

function terms(query: string) {
  return [
    ...new Set(
      query
        .toLowerCase()
        .replace(/[^a-z0-9+#.\s-]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2 && !STOP.has(w))
    ),
  ];
}

/** First sentence containing the term, trimmed to something readable. */
function snippetFor(text: string, matched: string[]) {
  const lines = text.split('\n').filter((l) => l.trim().length > 30);
  const hit = lines.find((l) => matched.some((t) => l.toLowerCase().includes(t)));
  const line = (hit ?? lines[0] ?? text).replace(/^[-\s]+/, '').trim();
  return line.length > 220 ? `${line.slice(0, 217).trimEnd()}…` : line;
}

/**
 * The no-AI path.
 *
 * This runs when the model is unavailable — quota exhausted, model retired,
 * upstream error. It is deliberately dumb: substring matching over the same
 * records the model would have read. It cannot phrase an answer, but it always
 * works, costs nothing, and points at real pages. A visitor gets a usable
 * result instead of an error, which matters most on the day the quota runs out.
 */
export async function search(query: string, limit = 4): Promise<Hit[]> {
  const t = terms(query);
  if (!t.length) return [];

  const records = await getRecords();
  const scored: { record: Record; score: number; matched: string[] }[] = [];

  for (const record of records) {
    const haystack = record.text.toLowerCase();
    const title = record.title.toLowerCase();
    let score = 0;
    const matched: string[] = [];

    for (const term of t) {
      // Counting occurrences rewards an entry that is *about* the term over
      // one that mentions it once in a stack list.
      const hits = haystack.split(term).length - 1;
      if (hits > 0) {
        score += Math.min(hits, 4);
        matched.push(term);
      }
      if (title.includes(term)) score += 5;
    }

    if (score > 0) scored.push({ record, score, matched });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ record, matched }) => ({
      title: record.title,
      href: record.href,
      kind: record.kind,
      snippet: snippetFor(record.text, matched),
    }));
}
