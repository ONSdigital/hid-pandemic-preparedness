import type { ISbStoryData } from "storyblok-js-client";
import { describe, expect, test } from "vitest";

import type { ReferenceProps } from "@src/components/Molecules/Core/Reference/Reference.interface";

import { createReferenceId } from "./createReferenceId";

describe("createReferenceId helper", () => {
  // Create default reference props
  const defaultProps: ReferenceProps = {
    _uid: "d2749648-d92c-4b85-8d86-993af8a4715b",
    type: "",
    component: "Reference",
    websiteUrl: "https://data.who.int/dashboards/covid19/deaths",
    accessedDate: "26th August 2025",
    websiteTitle: "WHO COVID-19 dashboard",
    websiteAuthor: "World Health Organisation",
    yearPublished: "2025",
  };

  test("returns id using `_uid` if input props contains no label", () => {
    const idString: string = createReferenceId(defaultProps);
    expect(idString).toEqual(`#${defaultProps._uid}`);
  });

  test("returns id using `label` if input props contains label", () => {
    const updatedProps: ReferenceProps = {
      ...defaultProps,
      label: "1",
    };

    const idString: string = createReferenceId(updatedProps);
    expect(idString).toEqual(`#ref-${updatedProps.label}`);
  });

  test("id should be slugified if `label` is a space separated string", () => {
    const updatedProps: ReferenceProps = {
      ...defaultProps,
      label: "My Space Separated string",
    };

    const idString: string = createReferenceId(updatedProps);
    expect(idString).toEqual(`#ref-my-space-separated-string`);
  });
});
