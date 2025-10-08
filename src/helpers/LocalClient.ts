import fs from "fs";
import path from "path";
import type {
  ISbCustomFetch,
  ISbStoriesParams,
  ISbResult,
} from "storyblok-js-client";

interface ILocalClient {
  get(
    slug: string,
    params?: ISbStoriesParams,
    fetchOptions?: ISbCustomFetch,
  ): Promise<ISbResult>;
}

// Provides a client to load data from local files in the same way as the StoryblokClient. This
// means we can load the right client depending on environment and functionality is the same.
export class LocalClient implements ILocalClient {
  // Get method supports:
  //  * Fetching of datasource entries `cdn/datasource_entries`
  public get(url: string, params?: any): Promise<ISbResult> {
    if (url === "cdn/datasource_entries") {
      // Check the params are in the right format

      // Build the path so we can load data from json
      const filePath = path.resolve(
        process.cwd(),
        "src",
        "content",
        "datasource_entries",
        `${params.datasource}.json`,
      );
      try {
        const datasourceData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const response: ISbResult = {
          data: {
            datasource_entries: datasourceData.entries,
          },
          headers: new Headers(),
          perPage: datasourceData.entries.length,
          total: datasourceData.entries.length,
        };
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    // Return a mocked 404 response for unknown URLs
    return Promise.reject(
      new Error(
        `404: Endpoint "${url}" not available in LocalClient.get method.`,
      ),
    );
  }
}
