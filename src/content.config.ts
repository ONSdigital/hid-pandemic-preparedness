import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// https://docs.astro.build/en/guides/content-collections/

const index = defineCollection({
  loader: glob({ pattern: "index.json", base: "./src/content/homepage/" }),
  schema: z.object({
    name: z.string(),
    created_at: z.coerce.date(),
    published_at: z.coerce.date(),
    content: z.object({
      component: z.string(),
      hero: z.object({
        component: z.string(),
        headline: z.string(),
        subheadline: z.string(),
        background_image: z.object({
          filename: z.string(),
        }),
      }),
    }),
  }),
});

export const collections = { index };
