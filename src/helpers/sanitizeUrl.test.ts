import { describe, expect, test } from "vitest";

import { sanitizeUrl } from "./sanitizeUrl";

// Test when `sanitizeUrl` is called with single `baseUrl` argument
describe.each([
  { baseUrl: "https://ons.gov.uk", expected: "https://ons.gov.uk/" },
  { baseUrl: "https://ons.gov.uk/", expected: "https://ons.gov.uk/" },
])("describe object sanitizeUrl($baseUrl)", ({ baseUrl, expected }) => {
  test(`returns ${expected}`, () => {
    expect(sanitizeUrl(baseUrl)).toBe(expected);
  });
});

// Test when `sanitizeUrl` is called with `baseUrl` and `path` arguments
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
])("describe object sanitizeUrl($baseUrl)", ({ baseUrl, path, expected }) => {
  test(`returns ${expected}`, () => {
    expect(sanitizeUrl(baseUrl, path)).toBe(expected);
  });
});
