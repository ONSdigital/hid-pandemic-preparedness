import { describe, it, expect, test } from "vitest";

import { constructUrl } from "./constructUrl";

describe.each([
  { baseUrl: "https://ons.gov.uk", expected: "https://ons.gov.uk/" },
  { baseUrl: "https://ons.gov.uk/", expected: "https://ons.gov.uk/" },
])("describe object constructUrl($baseUrl)", ({ baseUrl, expected }) => {
  test(`returns ${expected}`, () => {
    expect(constructUrl(baseUrl)).toBe(expected);
  });
});

describe.each([
  {
    baseUrl: "https://ons.gov.uk",
    path: "path",
    expected: "https://ons.gov.uk/path/",
  },
  {
    baseUrl: "https://ons.gov.uk",
    path: "/path",
    expected: "https://ons.gov.uk/path/",
  },
  {
    baseUrl: "https://ons.gov.uk",
    path: "path/",
    expected: "https://ons.gov.uk/path/",
  },
  {
    baseUrl: "https://ons.gov.uk",
    path: "/path/",
    expected: "https://ons.gov.uk/path/",
  },
  {
    baseUrl: "https://ons.gov.uk/",
    path: "path",
    expected: "https://ons.gov.uk/path/",
  },
  {
    baseUrl: "https://ons.gov.uk/",
    path: "/path",
    expected: "https://ons.gov.uk/path/",
  },
  {
    baseUrl: "https://ons.gov.uk/",
    path: "path/",
    expected: "https://ons.gov.uk/path/",
  },
  {
    baseUrl: "https://ons.gov.uk/",
    path: "/path/",
    expected: "https://ons.gov.uk/path/",
  },
])("describe object constructUrl($baseUrl)", ({ baseUrl, path, expected }) => {
  test(`returns ${expected}`, () => {
    expect(constructUrl(baseUrl, path)).toBe(expected);
  });
});
