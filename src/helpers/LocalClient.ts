import fs from "fs";
import path from "path";
import type {
  ISbCustomFetch,
  ISbResult,
  ISbStoriesParams,
} from "storyblok-js-client";

interface ILocalClient {
  get(
    slug: string, // eslint-disable-line no-unused-vars
    params?: ISbStoriesParams, // eslint-disable-line no-unused-vars
    fetchOptions?: ISbCustomFetch, // eslint-disable-line no-unused-vars
  ): Promise<ISbResult>;
}

// Provides a client to load data from local files in the same way as the StoryblokClient. This
// means we can load the right client depending on environment and functionality is the same.
export class LocalClient implements ILocalClient {
  // Get method supports:
  //  * Fetching of datasource entries `cdn/datasource_entries`
  //  * Fetching of a story `cdn/stories`
  public get(url: string, params?: any): Promise<ISbResult> {
    // Get collection string which should be the second part of url after `cdn`
    const contentCollection: string = url.split("/")[1];

    // Build the initial file path
    let filePath: string = path.resolve(
      process.cwd(),
      "src",
      "content",
      contentCollection,
    );
    let slug = undefined;

    if (contentCollection === "datasource_entries") {
      // Build the path slug
      slug = params.datasource;
    } else if (contentCollection === "stories") {
      // Build the path slug
      slug = url.replace("cdn/stories/", "");
      // Trim any trailing slash
      slug = slug.replace(/\/$/, "");
    } else {
      // We don't support this currently so error
      return Promise.reject(
        new Error(
          `404: Endpoint "${url}" not available in LocalClient.get method.`,
        ),
      );
    }

    // Construct full file path based on whether we have a valid slug
    if (slug) {
      filePath = path.resolve(filePath, `${slug}.json`);
    } else {
      filePath = `${filePath}.json`;
    }

    try {
      const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      let fileDataLength = 0;

      // Construct `perPage` and `total` fields if we have multiple entries instead of a single
      // entry
      if (contentCollection in fileData) {
        if (Array.isArray(fileData[contentCollection])) {
          fileDataLength = fileData[contentCollection].length;
        }
      }

      const response: ISbResult = {
        data: fileData,
        headers: new Headers(),
        perPage: fileDataLength,
        total: fileDataLength,
      };
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
