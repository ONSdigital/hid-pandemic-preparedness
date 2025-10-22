import { describe, expect, test } from "vitest";

import { sanitizeUrl } from "./sanitizeUrl";

// Test when `sanitizeUrl` is called with single `baseUrl` argument consisting of absolute or relative urls
describe.each([
  { baseUrl: "https://ons.gov.uk", expected: "https://ons.gov.uk/" },
  { baseUrl: "https://ons.gov.uk/", expected: "https://ons.gov.uk/" },
  {
    baseUrl: "learning-resources/data-analysis",
    expected: "/learning-resources/data-analysis/",
  },
  {
    baseUrl: "learning-resources/data-analysis/",
    expected: "/learning-resources/data-analysis/",
  },
  {
    baseUrl: "/learning-resources/data-analysis",
    expected: "/learning-resources/data-analysis/",
  },
  {
    baseUrl: "/learning-resources/data-analysis/",
    expected: "/learning-resources/data-analysis/",
  },
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
  {
    baseUrl: "learning-resources/data-analysis",
    path: "/path",
    expected: "/learning-resources/data-analysis/path/",
  },
  {
    baseUrl: "learning-resources/data-analysis",
    path: "path/",
    expected: "/learning-resources/data-analysis/path/",
  },
  {
    baseUrl: "learning-resources/data-analysis",
    path: "/path/",
    expected: "/learning-resources/data-analysis/path/",
  },
])("describe object sanitizeUrl($baseUrl)", ({ baseUrl, path, expected }) => {
  test(`returns ${expected}`, () => {
    expect(sanitizeUrl(baseUrl, path)).toBe(expected);
  });
});
