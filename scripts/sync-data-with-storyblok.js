import "dotenv/config";
import fs from "fs";
import path from "path";
import StoryblokClient from "storyblok-js-client";

// Read config env vars from the environment
const STORYBLOCK_ACCESS_TOKEN = process.env.STORYBLOCK_ACCESS_TOKEN;
const STORYBLOK_SPACE_ID = process.env.STORYBLOK_SPACE_ID;

const DATASOURCES_FILE = path.resolve(
  process.cwd(),
  "src",
  "content",
  "datasources.json",
);

// Syncs local JSON data with Storyblok Datasources and their entries.
async function syncDataWithStoryblok() {
  const data = fs.readFileSync(DATASOURCES_FILE, "utf-8");
  const datasourcesData = JSON.parse(data);

  // Initialise the Storyblok client for Management API (OAuth Token)
  const Storyblok = new StoryblokClient({
    oauthToken: STORYBLOCK_ACCESS_TOKEN,
  });

  console.log("Syncing datasources with Storyblok.");

  // Loop through local datasources definition
  for (const datasource of datasourcesData) {
    let datasourceId = null;
    const datasourceName = datasource.name;
    const datasourceSlug = datasource.slug;

    // Fetch the existing datasource id using the datasource name
    try {
      const response = await Storyblok.get(
        `spaces/${STORYBLOK_SPACE_ID}/datasources/`,
        {
          search: datasourceName,
        },
      );

      const returnedDatasources = response.data.datasources;

      if (returnedDatasources && returnedDatasources.length > 0) {
        // Found existing datasource
        datasourceId = returnedDatasources[0].id;
        console.log(
          `\tFound existing Datasource: "${datasourceName}" (ID: ${datasourceId})`,
        );
      } else {
        // Datasource not found, attempt to create it
        console.log(
          `\tDatasource "${datasourceName}" not found. Attempting creation...`,
        );

        const createResponse = await Storyblok.post(
          `spaces/${STORYBLOK_SPACE_ID}/datasources/`,
          {
            datasource: {
              name: datasourceName,
              slug: datasourceSlug,
            },
          },
        );
        datasourceId = createResponse.data.datasource.id;
        console.log(
          `\tCreated new Datasource: "${datasourceName}" (ID: ${datasourceId})`,
        );
      }
    } catch (error) {
      console.error(
        `\tFailed to fetch/create Datasource "${datasourceName}":`,
        error.message,
      );
      continue; // Skip entries for this broken datasource
    }

    // Upload the datasource entries
    if (
      datasourceId &&
      datasource.entries &&
      Array.isArray(datasource.entries)
    ) {
      // Get all the existing datasource entries so we can check whether they already exist later
      let existingEntries = null;
      try {
        const response = await Storyblok.get(
          `spaces/${STORYBLOK_SPACE_ID}/datasource_entries/`,
          { datasource_id: datasourceId },
        );
        existingEntries = response.data.datasource_entries;
      } catch (error) {
        console.error(
          `\tFailed to get existing entries for Datasource ID "${datasourceId}":`,
          error.message,
        );
      }

      // Loop through all the entries
      for (const entry of datasource.entries) {
        // Check whether we already have the entry
        const existingEntry = existingEntries.find(
          (entry) => entry.name === entry.name,
        );

        if (existingEntry) {
          // Already exists so update the value only
          try {
            await Storyblok.put(
              `spaces/${STORYBLOK_SPACE_ID}/datasource_entries/${existingEntry.id}/`,
              {
                datasource_entry: {
                  value: entry.value,
                },
              },
            );
            console.log(`\tEntry '${entry.name}' updated.`);
          } catch (error) {
            console.error(
              `\tFailed to update entry ${entry.name}:`,
              error.message,
            );
          }
        } else {
          try {
            // Doesn't exist so create
            await Storyblok.post(
              `spaces/${STORYBLOK_SPACE_ID}/datasource_entries/`,
              {
                datasource_entry: {
                  datasource_id: datasourceId,
                  name: entry.name,
                  value: entry.value,
                },
              },
            );
            console.log(`\tEntry '${entry.name}' created.`);
          } catch (error) {
            console.error(
              `\tFailed to create entry ${entry.name}:`,
              error.message,
            );
          }
        }
      }
    }
    console.log("Syncing data complete.");
  }
}

syncDataWithStoryblok();
