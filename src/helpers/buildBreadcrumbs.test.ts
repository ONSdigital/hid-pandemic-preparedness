import { describe, expect, test, vi } from "vitest";
import type { Mock } from "vitest";

import { fetchStories } from "@src/helpers/fetchContent";

import { buildBreadcrumbs } from "./buildBreadcrumbs";

// Mock the module where fetchStories is exported
vi.mock("@src/helpers/fetchContent", () => {
  return {
    fetchStories: vi.fn(),
  };
});

// Example stories data with unused fields omitted
const stories = [
  {
    name: "Data analysis",
    id: 101682469948563,
    uuid: "f68305ec-d8a4-4e59-b2b2-f059df46fc05",
    slug: "data-analysis",
    full_slug: "learning-resources/data-analysis/",
    parent_id: 101679722763615,
    path: null,
  },
  {
    name: "Home",
    id: 96814736940977,
    uuid: "e26bc65c-c83e-4d04-a5da-114fec6ce981",
    slug: "home",
    full_slug: "home",
    parent_id: 0,
    path: "/",
  },
  {
    name: "Learning resources",
    id: 101682335767695,
    uuid: "e5337d90-ad03-4bf1-9a64-3994fc990820",
    slug: "learning-resources",
    full_slug: "learning-resources/",
    parent_id: 101679534245195,
    path: null,
  },
  {
    name: "Epidemiological analysis",
    id: 101682550221975,
    uuid: "87076f3e-9fae-4606-ad8d-e709bc04ff4f",
    slug: "epidemiological-analysis",
    full_slug: "learning-resources/data-analysis/epidemiological-analysis/",
    parent_id: 101679800665477,
    path: null,
  },
];

describe("buildBreadcrumbs with link hierarchy", () => {
  test("builds breadcrumbs when input `fullSlug` is empty", async () => {
    // Arrange: define the mock return value
    // (fetchStories as Mock).mockResolvedValue({
    //   data: {
    //     // Corresponds to just the home story
    //     stories: [stories[1]],
    //   },
    // });
    (fetchStories as Mock).mockResolvedValue([stories[1]]);
    const result = await buildBreadcrumbs("home");

    expect(fetchStories).toHaveBeenCalledWith({
      by_slugs: "home,home",
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      title: "Home",
      url: "/",
    });
  });

  test("builds breadcrumbs when input `fullSlug` can be split into two", async () => {
    // Arrange: define the mock return value
    (fetchStories as Mock).mockResolvedValue(stories.slice(1, 3));
    const result = await buildBreadcrumbs("/learning-resources/");

    expect(fetchStories).toHaveBeenCalledWith({
      by_slugs: "home,learning-resources/,/learning-resources/",
    });
    expect(result.items).toHaveLength(2);
    expect(result.items[0]).toMatchObject({
      title: "Home",
      url: "/",
    });
    expect(result.items[1]).toMatchObject({
      title: "Learning resources",
      url: "/learning-resources/",
    });
  });

  test("builds breadcrumbs when input `fullSlug` can be split into four", async () => {
    // Arrange: define the mock return value
    (fetchStories as Mock).mockResolvedValue(stories);
    const result = await buildBreadcrumbs(
      "/learning-resources/data-analysis/epidemiological-analysis/",
    );

    expect(fetchStories).toHaveBeenCalledWith({
      by_slugs:
        "home,learning-resources/,learning-resources/data-analysis/,learning-resources/data-analysis/epidemiological-analysis/,/learning-resources/data-analysis/epidemiological-analysis/",
    });
    expect(result.items).toHaveLength(4);
    expect(result.items[0]).toMatchObject({
      title: "Home",
      url: "/",
    });
    expect(result.items[1]).toMatchObject({
      title: "Learning resources",
      url: "/learning-resources/",
    });
    expect(result.items[2]).toMatchObject({
      title: "Data analysis",
      url: "/learning-resources/data-analysis/",
    });
    expect(result.items[3]).toMatchObject({
      title: "Epidemiological analysis",
      url: "/learning-resources/data-analysis/epidemiological-analysis/",
    });
  });
});
