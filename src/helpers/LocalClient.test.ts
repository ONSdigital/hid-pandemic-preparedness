import { describe, it, expect } from "vitest";
import type {
  ISbCustomFetch,
  ISbStoriesParams,
  ISbResult,
} from "storyblok-js-client";

import type { DatasourceEntry } from "@src/types/DatasourceEntry";

import { LocalClient } from "./LocalClient";

describe("LocalClient", () => {
  const client = new LocalClient();

  it("returns breadcrumb string data correctly if data exists", async () => {
    const slug: string = "breadcrumb-strings";
    const locale: string = "en";

    const expectedResult: ISbResult = {
      data: {
        datasource_entries: [
          {
            name: "homeLabel",
            value: "Home",
          },
        ],
      },
      headers: new Headers(),
      perPage: 1,
      total: 1,
    };
    const result = await client.get("cdn/datasource_entries", {
      datasource: slug,
      dimension: locale,
    });
    expect(result).toMatchObject(expectedResult);
  });
  it("raises error if file not found", async () => {
    // This file is not valid
    const slug: string = "cookiecrumb-strings";
    const locale: string = "en";

    const promise = client.get("cdn/datasource_entries", {
      datasource: slug,
      dimension: locale,
    });

    // Expect the promise to be rejected and contain file not found
    await expect(promise).rejects.toThrow(/ENOENT: no such file or directory/i);
  });
  it("raises error if path is not provided for", async () => {
    // File is valid but path is not
    const slug: string = "breadcrumb-strings";
    const locale: string = "en";

    const promise = client.get("cdn/datasauce_entries", {
      datasource: slug,
      dimension: locale,
    });

    // Expect the promise to be rejected
    await expect(promise).rejects.toThrow(
      `404: Endpoint "cdn/datasauce_entries" not available in LocalClient.get method.`,
    );
  });
});
