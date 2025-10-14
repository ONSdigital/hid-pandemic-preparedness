import "dotenv/config";
import fs from "fs";
import path from "path";
import StoryblokClient from "storyblok-js-client";

// Read config env vars from the environment
const STORYBLOK_ACCESS_TOKEN = process.env.STORYBLOK_ACCESS_TOKEN;

const SPACE_FILE = path.resolve(
  process.cwd(),
  "src",
  "content",
  "spaces",
  "me.json",
);

// Syncs local JSON data with Storyblok Datasources and their entries.
async function fetchSpace() {
  console.log(`STORYBLOK_ACCESS_TOKEN: ${STORYBLOK_ACCESS_TOKEN}`);

  // Initialise the Storyblok client for Content API (Access Token)
  const Storyblok = new StoryblokClient({
    accessToken: STORYBLOK_ACCESS_TOKEN,
  });

  console.log("Fetching space data from Storyblok...");

  try {
    const response = await Storyblok.get("cdn/spaces/me");
    // Redact the domain before writing to file
    const space = { space: { ...response.data.space, domain: "" } };
    fs.writeFileSync(SPACE_FILE, JSON.stringify(space, null, 2));
  } catch (error) {
    console.error("\tFailed to fetch and update Space data: ", error.message);
  }

  console.log("Fetching data complete.");
}

fetchSpace();
