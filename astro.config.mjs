import { defineConfig } from "astro/config";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "STORYBLOK");

export default defineConfig({
  vite: {
    plugins: [],
  },
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      apiOptions: {
        region: "eu",
      },
    }),
  ],
  components: {
    page: "storyblok/Page",
    grid: "storyblok/Grid",
    feature: "storyblok/Feature",
    teaser: "storyblok/Teaser",
  },
});
