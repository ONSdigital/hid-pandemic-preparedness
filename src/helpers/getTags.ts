import type { ISbStoryData } from "storyblok-js-client";
import { v4 as uuidv4 } from "uuid";

import type { Tag } from "@src/types/Tag";

// Function extracts tags from input `story` and returns as an array of `Tag` objects
export function getTags(story: ISbStoryData): Tag[] {
  let returnTags: Tag[] = [];

  if (story.tag_list.length > 1) {
    // Loop through stories and create a `Tag` object for each one including an id
    story.tag_list.map((tag) => {
      returnTags.push({ id: uuidv4(), title: tag });
    });
  }

  return returnTags;
}
