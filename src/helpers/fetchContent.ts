import "dotenv/config";

import { useStoryblokApi } from "@storyblok/astro";
import type { ISbStories, ISbStoriesParams, ISbStory } from "@storyblok/astro";

import { LocalClient } from "@src/helpers/LocalClient";
import type { DatasourceEntry } from "@src/types/DatasourceEntry";

// Read config env vars from the environment
const ASTRO_PREVIEW = process.env.ASTRO_PREVIEW || "false";
const ASTRO_USE_LOCAL_DATA = process.env.ASTRO_USE_LOCAL_DATA || "true";

const client =
  ASTRO_USE_LOCAL_DATA === "true"
    ? // Use local client to load data from source files
      new LocalClient()
    : // Initialise the Storyblok client for Content Delivery API (Access Token)
      useStoryblokApi();

// Set requested version based on whether we're running on preview or not
const VERSION = ASTRO_PREVIEW === "true" ? "draft" : "published";

// Fetches datasource content from either static content files as part of the repo or from CMS api
// depending on client initialised
export async function fetchDatasourceEntries(
  slug: string,
  name?: string,
  locale: string = "en",
): Promise<DatasourceEntry[] | DatasourceEntry> {
  let datasourceEntries: DatasourceEntry[];

  // Retrieve all the datasources so we can then find the id for the one we want
  const response = await client.get("cdn/datasource_entries", {
    datasource: slug,
    dimension: locale,
    version: VERSION,
  });
  datasourceEntries = response.data.datasource_entries;

  // Either return all the entries or just one depending on whether a name is part of the input args
  if (name) {
    const datasourceEntry = datasourceEntries.find(
      (item) => item.name === name,
    );
    if (datasourceEntry) {
      return datasourceEntry;
    } else {
      throw new Error(`Datasource entry not found for name "${name}"`);
    }
  } else {
    return datasourceEntries;
  }
}

// Fetches stores
export async function fetchStories(
  params?: ISbStoriesParams,
): Promise<ISbStories> {
  const response = await client.get("cdn/stories/", {
    version: VERSION,
    per_page: 100,
    resolve_links: "story",
    ...params,
  });
  return response;
}

// Fetches story content from input `pathParam` and returns just the content
export async function fetchStory(
  pathParam: string | number,
  params?: ISbStoriesParams,
): Promise<ISbStory> {
  // If input `pathParam` is `/`, this is the path for the homepage but we can't return the story
  // using this so update to just `home`
  if (pathParam === "/") {
    pathParam = "home";
  }

  const response = await client.get(`cdn/stories/${pathParam}`, {
    version: VERSION,
    resolve_links: "story",
    ...params,
  });
  return response;
}
