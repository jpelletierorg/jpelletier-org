import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const milestone = z.object({
  date: z.string(),
  text: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'paused', 'completed']),
    oneliner: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    demo: z.string().url().optional(),
    repo: z.string().url().optional(),
    date: z.coerce.date(),
    week: z.number().optional(),
    order: z.number().default(0),
    milestones: z.array(milestone).default([]),
  }),
});

const graveyard = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/graveyard' }),
  schema: z.object({
    title: z.string(),
    epitaph: z.string(),
    draft: z.boolean().default(false),
    date: z.coerce.date(),
    order: z.number().default(0),
  }),
});

export const collections = { projects, graveyard };
