import slugify from "slugify";

import type { ReferenceProps } from "@src/components/Molecules/Core/Reference/Reference.interface";

// Takes input `referenceProps` and creates a reference string we can use to create a navigable
// link between where the reference is in the text and the References organism at the foot of the
// page
export function createReferenceId(referenceProps: ReferenceProps): string {
  if (referenceProps.label) {
    return `ref-${slugify(referenceProps.label, { lower: true })}`;
  } else {
    return referenceProps._uid;
  }
}
