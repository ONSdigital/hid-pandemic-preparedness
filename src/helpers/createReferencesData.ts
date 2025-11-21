import type { ISbStoryData } from "storyblok-js-client";
import { v4 as uuidv4 } from "uuid";

import type { ReferenceProps } from "@src/components/Molecules/Core/Reference/Reference.interface";

// Function extracts all `Reference` component data from input `story` and returns as an array of
// `ReferenceProps` objects including numbered label
export function createReferencesData(story: ISbStoryData): ReferenceProps[] {
  let returnReferenceProps: ReferenceProps[] = [];

  return returnReferenceProps;
}
