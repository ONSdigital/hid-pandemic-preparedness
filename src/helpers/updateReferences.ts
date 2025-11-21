import jp from "jsonpath";

import type { ISbStoryData } from "storyblok-js-client";

import type { ReferenceProps } from "@src/components/Molecules/Core/Reference/Reference.interface";

// Function extracts all `Reference` component data from input `story` and returns as an array of
// `ReferenceProps` objects including numbered label
export function createReferencesData(story: ISbStoryData): ReferenceProps[] {
  // console.log(story.content);
  const TARGET_MATCH_KEYS: string[] = [
    "accessedDate",
    "yearPublished",
    "websiteAuthor",
    "websiteTitle",
    "websiteUrl",
  ];
  let returnReferences: ReferenceProps[] = [];

  // Find any references as part of the content data
  const references: ReferenceProps[] = jp.query(
    story.content,
    "$..[?(@.component=='Reference')]",
  );
  // console.log(references);

  if (references) {
    // Remove any duplicates that might be present based on a subset of keys
    const duplicatesSet = new Set();

    const uniqueReferences = references.filter((item) => {
      // Create a composite key string from the specified keys
      const compositeKey = TARGET_MATCH_KEYS.map((key) => item[key]).join("|");

      if (duplicatesSet.has(compositeKey)) {
        return false; // duplicate, filter out
      } else {
        duplicatesSet.add(compositeKey);
        return true; // first occurrence, keep it
      }
    });

    // Update to add additional `label` key for numbering
    returnReferences = uniqueReferences.map((ref, index) => ({
      ...ref,
      label: (index + 1).toString(),
    }));
  }

  return returnReferences;
}
