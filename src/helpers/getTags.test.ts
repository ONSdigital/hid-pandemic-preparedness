import type { ISbStoryData } from "storyblok-js-client";
import { describe, expect, test } from "vitest";

import type { Tag } from "@src/types/Tag";

import { getTags } from "./getTags";

describe("getTags helper", () => {
  // Create default story with empty `tag_list`
  const defaultStory: ISbStoryData = {
    name: "Mortality analysis",
    created_at: "2025-10-20T13:29:29.961Z",
    published_at: null,
    id: 103536107383396,
    uuid: "cc26ff13-e25b-410d-a553-d8175f46910e",
    content: {},
    slug: "mortality-analysis",
    full_slug:
      "learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/",
    sort_by_date: null,
    position: 0,
    tag_list: [],
    parent_id: 101679933737008,
    meta_data: null,
    group_id: "e9a9b63f-a1b2-4779-8cf6-7da41c01cc36",
    lang: "default",
    alternates: [],
  };

  test("returns empty array if input story contains no tags", () => {
    const tags: Tag[] = getTags(defaultStory);
    expect(tags).toEqual([]);
  });
  test("returns array of valid tags if input story contains tags", () => {
    // Update input story with some tags
    const tags: Tag[] = getTags({
      ...defaultStory,
      tag_list: ["Reports", "Beginner"],
    });
    expect(tags.length).toEqual(2);
    expect(tags[0].title).toEqual("Reports");
    expect(tags[1].title).toEqual("Beginner");
  });
});
