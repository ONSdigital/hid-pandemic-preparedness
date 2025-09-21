import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// https://docs.astro.build/en/guides/content-collections/

const learningResourcesContent = defineCollection({
  loader: glob({
    pattern: "learning-resources/**/content.md",
    base: "./src/content/",
  }),
});

const learningResourcesIntroduction = defineCollection({
  loader: glob({
    pattern: "learning-resources/**/introduction.json",
    base: "./src/content/",
  }),
});

const toolsContent = defineCollection({
  loader: glob({
    pattern: "tools/**/content.md",
    base: "./src/content/",
  }),
});

const toolsExplainer = defineCollection({
  loader: glob({
    pattern: "tools/**/explainer.md",
    base: "./src/content/",
  }),
});

export const collections = {
  learningResourcesContent,
  learningResourcesIntroduction,
  toolsContent,
  toolsExplainer,
};
