import { getCollection } from 'astro:content';
import { profile, tracks } from '../data/profile';

/**
 * One addressable piece of the portfolio. The AI answers from `text`; the
 * keyword fallback searches the same `text`, so both paths see exactly the
 * same facts and cannot disagree about what the site says.
 */
export interface Record {
  id: string;
  kind: 'experience' | 'project' | 'profile';
  title: string;
  /** Where a visitor can read this in full, when it has its own page. */
  href?: string;
  track: 'react' | 'webflow' | 'both';
  text: string;
}

/**
 * Contact details are deliberately absent from everything below.
 *
 * `profile.ts` carries an email and a phone number. Serialized into the model's
 * context they become something it will read out to anyone who asks — and the
 * people who ask hardest are scrapers. The answer to "how do I contact him?"
 * is a pointer to /about#contact, which a human follows and a harvester does
 * not. Add `profile.email` or `profile.phone` here and that protection is gone.
 */
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "2023-05" -> "May 2023". Matches how the track pages render dates. */
function month(iso: string) {
  const [y, m] = iso.split('-');
  return `${monthNames[Number(m) - 1]} ${y}`;
}

/** Collapses markdown noise so the model reads prose, not syntax. */
function flatten(markdown: string) {
  return markdown
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

let cached: Record[] | null = null;

/**
 * Built from the content collections, so editing a .md file is the only step
 * required to change what the assistant knows. There is no index to rebuild
 * and nothing to keep in sync — a content edit ships with the next deploy.
 */
export async function getRecords(): Promise<Record[]> {
  if (cached) return cached;

  const records: Record[] = [];

  for (const [slug, t] of Object.entries(tracks)) {
    records.push({
      id: `track-${slug}`,
      kind: 'profile',
      title: `${t.label} — positioning`,
      href: `/${slug}`,
      track: slug as 'react' | 'webflow',
      text: [
        `Track: ${t.label} (${t.headline})`,
        t.tagline,
        `Headline metric: ${t.proof.value} — ${t.proof.label}`,
        ...Object.entries(t.skills).map(([group, items]) => `${group}: ${items.join(', ')}`),
      ].join('\n'),
    });
  }

  records.push({
    id: 'profile',
    kind: 'profile',
    title: 'Personal details',
    href: '/about',
    track: 'both',
    text: [
      `Name: ${profile.name}`,
      `Based in: ${profile.location}`,
      `Languages: ${profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}`,
      'Contact: via the contact section at /about — do not state an email address or phone number.',
    ].join('\n'),
  });

  const experience = (await getCollection('experience')).sort((a, b) =>
    b.data.start.localeCompare(a.data.start)
  );

  for (const role of experience) {
    const d = role.data;
    records.push({
      id: `experience-${role.id}`,
      kind: 'experience',
      title: `${d.role}, ${d.company}`,
      href: '/about',
      track: d.track,
      text: [
        `Role: ${d.role} at ${d.company}`,
        `Dates: ${month(d.start)} — ${d.end ? month(d.end) : 'present (current role)'}`,
        `Location: ${d.location}`,
        `Relevant to track: ${d.track}`,
        d.context && `Context: ${d.context}`,
        d.stack.length && `Stack: ${d.stack.join(', ')}`,
        d.highlights.length && `Highlights:\n${d.highlights.map((h) => `- ${h}`).join('\n')}`,
        d.note && `Note: ${d.note}`,
        role.body && flatten(role.body),
      ]
        .filter(Boolean)
        .join('\n'),
    });
  }

  const projects = (await getCollection('projects')).sort(
    (a, b) => a.data.order - b.data.order
  );

  for (const project of projects) {
    const d = project.data;
    records.push({
      id: `project-${project.id}`,
      kind: 'project',
      title: d.title,
      href: `/work/${project.id}`,
      track: d.track,
      text: [
        `Project: ${d.title} (${d.year})`,
        `Summary: ${d.summary}`,
        `Track: ${d.track}`,
        d.client && `Client: ${d.client}`,
        `His role: ${d.role}`,
        d.stack.length && `Stack: ${d.stack.join(', ')}`,
        d.url && `Live site: ${d.url}`,
        d.highlights.length && `Highlights:\n${d.highlights.map((h) => `- ${h}`).join('\n')}`,
        project.body && flatten(project.body),
      ]
        .filter(Boolean)
        .join('\n'),
    });
  }

  cached = records;
  return records;
}

/**
 * The whole portfolio, as one string.
 *
 * At ~2,000 words this fits in a single prompt with room to spare, which is why
 * there is no retrieval step: the model sees every project and every role on
 * every question. Nothing can be "missed" by a retriever, so refusing to answer
 * is a reliable signal that the site genuinely does not say.
 */
export async function buildContext(): Promise<string> {
  const records = await getRecords();
  return records
    .map((r) => `<entry id="${r.id}" title="${r.title}"${r.href ? ` url="${r.href}"` : ''}>\n${r.text}\n</entry>`)
    .join('\n\n');
}
