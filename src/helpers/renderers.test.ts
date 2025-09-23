import { marked } from "marked";
import { describe, it, expect } from "vitest";

import { renderer } from "./renderers";

marked.use({ renderer: renderer });

describe("renderer", () => {
  const tableMarkdown: string =
    "| Name  | Age | City     |\n" +
    "|-------|-----|----------|\n" +
    "| Alice | 30  | New York |\n" +
    "| Bob   | 25  | London   |";

  const expectedOutput: string =
    '<table class="table-ppt">\n' +
    "<thead>\n" +
    "<tr>\n" +
    "<th>Name</th>\n" +
    "<th>Age</th>\n" +
    "<th>City</th>\n" +
    "</tr>\n" +
    "</thead>\n" +
    "<tbody><tr>\n" +
    "<td>Alice</td>\n" +
    "<td>30</td>\n" +
    "<td>New York</td>\n" +
    "</tr>\n" +
    "<tr>\n" +
    "<td>Bob</td>\n" +
    "<td>25</td>\n" +
    "<td>London</td>\n" +
    "</tr>\n" +
    "</tbody></table>\n";

  it("parses table markdown into html correctly", async () => {
    const result = marked.parse(tableMarkdown);
    expect(result).toMatch(expectedOutput);
  });
});
