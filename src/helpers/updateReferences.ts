import { JSONPath } from "jsonpath-plus";

import type { ISbStoryData } from "storyblok-js-client";

import type { ReferenceProps } from "@src/components/Molecules/Core/Reference/Reference.interface";

// The JSONPath expression as a (normalized or unnormalized) string or array
export const TARGET_EXPRESSION: string =
  "$..[?(@ && @.component=='Reference')]";

// List of `ReferenceProps` keys we target to match a reference. If all values associated with these
// keys are the same, the reference is a duplicate
const TARGET_MATCH_KEYS: string[] = [
  "accessedDate",
  "yearPublished",
  "websiteAuthor",
  "websiteTitle",
  "websiteUrl",
];

// Interface for the data returned when fetching matching json nodes using JSONPath
interface JsonPathNode<T = any> {
  path: (string | number)[];
  value: T;
}

// Function extracts all `Reference` component data from input `story` and returns as an array of
// `ReferenceProps` objects including numbered label if references are found, otherwise returns
// undefined
export function createReferencesData(
  story: ISbStoryData,
): ReferenceProps[] | undefined {
  let returnReferences = undefined;

  // Find any references as part of the content data
  const references: ReferenceProps[] = JSONPath({
    path: TARGET_EXPRESSION,
    json: story.content,
  });

  if (references.length > 0) {
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

// Function updates references in `story` with those in `referenceData` if valid. This allows us to
// set the label for each reference globally across the story
export function updateStoryReferences(
  story: ISbStoryData,
  referenceData: ReferenceProps[],
): ISbStoryData {
  const returnedStory = structuredClone(story);

  // If we have some references to perform an update with, create a map
  if (referenceData.length > 0) {
    // Create a Map for quick lookup of input references by composite key
    const referenceDataMap = new Map();

    referenceData.forEach((ref) => {
      const compositeKey = TARGET_MATCH_KEYS.map((key) => ref[key]).join("|");
      referenceDataMap.set(compositeKey, ref);
    });

    // Find any existing references in the story content
    const existingReferences: JsonPathNode[] = JSONPath({
      path: TARGET_EXPRESSION,
      json: returnedStory.content,
      resultType: "all",
    });

    // If there any existing references to update, do so
    if (existingReferences.length > 0) {
      // Loop through these nodes and update them if we find a matching reference in `referenceData`
      existingReferences.map(({ value }) => {
        // Create a composite key string from the specified keys to find matching reference
        const compositeKey = TARGET_MATCH_KEYS.map((key) => value[key]).join(
          "|",
        );

        const matchingRef = referenceDataMap.get(compositeKey);
        if (matchingRef) {
          // Add or update label key
          value.label = matchingRef.label;
        }
      });
    }
  }
  return returnedStory;
}
