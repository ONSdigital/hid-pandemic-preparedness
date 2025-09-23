import { marked } from "marked";
import { describe, it, expect } from "vitest";

import { tipTokenizer } from "./tokenizers";

marked.use({ tipTokenizer });

describe("tipTokenizer", () => {
  const tipMarkdown: string = "!TIP This is a special tip block.";

  const expectedOutput: string = `<span class="tip-ppt">This is a special tip block.</span>`;

  it("parses tip markdown into html correctly", async () => {
    const result = marked.parse(tipMarkdown);
    expect(result).toMatch(expectedOutput);
  });
});
