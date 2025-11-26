import { v4 as uuidv4 } from "uuid";

import type { Tag } from "@src/types/Tag";

// Function extracts tags from input `story` and returns as an array of `Tag` objects
export function getTags<T extends { tag_list?: string[] }>(obj: T): Tag[] {
  let returnTags: Tag[] = [];

  if (!obj.tag_list) return returnTags;

  if (obj.tag_list.length > 0) {
    // Loop through stories and create a `Tag` object for each one including an id
    obj.tag_list.map((tag) => {
      returnTags.push({ id: uuidv4(), title: tag });
    });
  }

  return returnTags;
}
