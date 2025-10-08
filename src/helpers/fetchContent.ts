import "dotenv/config";

import StoryblokClient from "storyblok-js-client";
import type { ISbStory } from "storyblok-js-client";

import { LocalClient } from "@helpers/LocalClient";
import type { DatasourceEntry } from "@/src/types/DatasourceEntry";

// Read config env vars from the environment
const ASTRO_USE_LOCAL_DATA = process.env.ASTRO_USE_LOCAL_DATA || "true";
const NODE_ENV = process.env.NODE_ENV || "development";
const STORYBLOK_ACCESS_TOKEN = process.env.STORYBLOK_ACCESS_TOKEN || undefined;

// Configures client to
const client =
  NODE_ENV === "development" && ASTRO_USE_LOCAL_DATA === "true"
    ? // Use local client to load data from source files
      new LocalClient()
    : // Initialise the Storyblok client for Content Delivery API (Access Token)
      new StoryblokClient({
        accessToken: STORYBLOK_ACCESS_TOKEN,
        cache: {
          clear: "auto",
        },
      });

// Fetches datasource content from either static content files as part of the repo or from CMS api
// depending on client initialised
export async function fetchDatasourceEntries(
  slug: string,
  name?: string,
  locale: string = "en",
): Promise<DatasourceEntry[] | DatasourceEntry> {
  let datasourceEntries: DatasourceEntry[];

  // Retrieve all the datasources so we can then find the id for the one we want
  try {
    const response = await client.get("cdn/datasource_entries", {
      datasource: slug,
      dimension: locale,
    });
    datasourceEntries = response.data.datasource_entries;
  } catch (error) {
    // Raise error if api call fails
    throw error;
  }

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

// Fetches story content from input `fullSlug` and returns just the content
export async function fetchStoryContent(fullSlug: string): Promise<any> {
  try {
    const response = await client.get(`cdn/stories/${fullSlug}`);
    return response.data.content;
  } catch (error) {
    // Raise error if api call fails
    throw error;
  }
}
