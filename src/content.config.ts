import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Which of the two portfolio tracks a piece of work belongs to. */
const track = z.enum(['react', 'webflow', 'both']);

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    /** ISO month, e.g. "2023-05". Used for sorting. */
    start: z.string(),
    /** ISO month, or null for a role still held. */
    end: z.string().nullable(),
    location: z.string(),
    track,
    /** One-line context shown under the role title. */
    context: z.string().optional(),
    /** Bullets, phrased for the given track. */
    highlights: z.array(z.string()),
    stack: z.array(z.string()).default([]),
    /** Surfaced on the track landing page rather than only in the timeline. */
    featured: z.boolean().default(false),
    /** Caveat rendered in smaller type, e.g. overlapping contract work. */
    note: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** Shown as the card's one-line pitch. */
    summary: z.string(),
    track,
    /** Public URL, when the work is visitable. */
    url: z.string().url().optional(),
    client: z.string().optional(),
    /** What Gevorg actually did — not the company's role. */
    role: z.string(),
    year: z.number(),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    /**
     * Screenshots in /public/images/, as root-relative paths. The first one is
     * the cover shown in the work list; all of them appear on the project page.
     * Empty is fine — both places degrade to type-only.
     */
    images: z
      .array(
        z.object({
          src: z.string(),
          /** What the image shows, for screen readers. */
          alt: z.string(),
        })
      )
      .default([]),
    featured: z.boolean().default(false),
    /** Display order within a track; lower comes first. */
    order: z.number().default(100),
  }),
});

export const collections = { experience, projects };
