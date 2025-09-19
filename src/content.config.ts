import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// https://docs.astro.build/en/guides/content-collections/

const learningResourcesIntroduction = defineCollection({
  loader: glob({
    pattern: "learning-resources/**/introduction.json",
    base: "./src/content/",
  }),
});

const learningResourcesContent = defineCollection({
  loader: glob({
    pattern: "learning-resources/**/content.md",
    base: "./src/content/",
  }),
});

export const collections = {
  learningResourcesIntroduction,
  learningResourcesContent,
};
