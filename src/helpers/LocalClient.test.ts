import { describe, expect, test } from "vitest";

import { LocalClient } from "./LocalClient";

const client = new LocalClient();

describe("LocalClient get request", () => {
  test("raises error if path is not provided for", async () => {
    const promise = client.get("cdn/datasauce_entries", {
      datasource: "",
      dimension: "",
    });

    // Expect the promise to be rejected
    await expect(promise).rejects.toThrow(
      `404: Endpoint "cdn/datasauce_entries" not available in LocalClient.get method.`,
    );
  });
});

describe("LocalClient get request datasource_entries", () => {
  const locale: string = "en";

  test("raises error if file not found", async () => {
    // Request invalid file
    const promise = client.get("cdn/datasource_entries", {
      datasource: "cookiecrumb-strings",
      dimension: locale,
    });

    // Expect the promise to be rejected and contain file not found
    await expect(promise).rejects.toThrow(/ENOENT: no such file or directory/i);
  });
});

describe("LocalClient get request stories", () => {
  test("returns stories correctly if data exists", async () => {
    // Request valid file as part of the request url
    const result = await client.get("cdn/stories/");
    // Don't look for the full result, but make sure important key/value pairs are there
    expect(result.data.stories[0]).toMatchObject({ name: "Data analysis" });
  });
});

describe("LocalClient get request story", () => {
  test("returns story data correctly if data exists", async () => {
    // Request valid file as part of the request url
    const result = await client.get("cdn/stories/home/");
    // Don't look for the full result, but make sure important key/value pairs are there
    expect(result.data.story).toMatchObject({ name: "Home" });
    expect(result.data.story).toMatchObject({ slug: "home" });
  });
  test("raises error if file not found", async () => {
    // Request invalid file as part of the request url
    const promise = client.get("cdn/stories/testsetest/");

    // Expect the promise to be rejected and contain file not found
    await expect(promise).rejects.toThrow(/ENOENT: no such file or directory/i);
  });
});
