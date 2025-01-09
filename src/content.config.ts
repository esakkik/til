import { defineCollection, z, } from 'astro:content';
import { glob } from 'astro/loaders';

const tils = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/tils/" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tag: z.array(z.string()).optional()
  }),
});

export const collections = { tils };



// 1stpost.md