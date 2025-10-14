import fs from "fs";
import path from "path";
import type {
  ISbCustomFetch,
  ISbResult,
  ISbStoriesParams,
  ISbStory,
} from "storyblok-js-client";

import type { ISpace } from "@src/types/Space";

// List of content types we have design for retrieval from Storyblok
const SUPPORTED_CONTENT: string[] = ["datasource_entries", "spaces", "stories"];

interface ILocalClient {
  get(
    slug: string, // eslint-disable-line no-unused-vars
    params?: ISbStoriesParams, // eslint-disable-line no-unused-vars
    fetchOptions?: ISbCustomFetch, // eslint-disable-line no-unused-vars
  ): Promise<ILocalClientResult>;
}

// This return interface includes additional parameters so it can be used when returning stories
// and spaces
export interface ILocalClientResult extends ISbResult {
  data: ISbStory["data"] & {
    space: ISpace;
  };
}

// Provides a client to load data from local files in the same way as the StoryblokClient. This
// means we can load the right client depending on environment and functionality is the same.
export class LocalClient implements ILocalClient {
  // Get method supports:
  //  * Fetching of datasource entries `cdn/datasource_entries`
  //  * Fetching of a story `cdn/stories`
  public get(url: string, params?: any): Promise<ILocalClientResult> {
    // Get collection string which should be the second part of url after `cdn`
    const contentCollection: string = url.split("/")[1];

    if (SUPPORTED_CONTENT.includes(contentCollection)) {
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
      } else {
        // Build the path slug
        slug = url.replace(`cdn/${contentCollection}/`, "");
        // Trim any trailing slash
        slug = slug.replace(/\/$/, "");
      }

      if (slug) {
        // Construct full file path
        filePath = path.resolve(filePath, `${slug}.json`);

        try {
          const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          let fileDataLength = undefined;

          // Construct `perPage` and `total` fields if we have multiple entries instead of a single
          // entry
          if (contentCollection in fileData) {
            if (Array.isArray(fileData[contentCollection])) {
              fileDataLength = fileData[contentCollection].length;
            }
          }

          const response: ILocalClientResult = {
            data: fileData,
            headers: new Headers(),
            perPage: fileDataLength ? fileDataLength : 0,
            total: fileDataLength ? fileDataLength : 0,
          };
          return Promise.resolve(response);
        } catch (error) {
          return Promise.reject(error);
        }
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
