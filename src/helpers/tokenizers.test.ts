import { marked } from "marked";
import { describe, it, expect } from "vitest";

import { mathBlockTokenizer, tipTokenizer } from "./tokenizers";

marked.use({
  extensions: [mathBlockTokenizer, tipTokenizer],
});

describe("mathBlockTokenizer", () => {
  const tipMarkdown: string = "$ qₓ = (2⋅mₓ) / (2 + mₓ) $";

  const expectedOutput: string = `<div class="d-flex p-3 fw-semibold math-block">qₓ = (2⋅mₓ) / (2 + mₓ)</div>`;

  it("parses math formula markdown into html correctly", async () => {
    const result = marked.parse(tipMarkdown);
    expect(result).toMatch(expectedOutput);
  });
});

describe("tipTokenizer", () => {
  const tipMarkdown: string = "!TIP This is a special tip block.";

  const expectedOutput: string = `<span class="tip-ppt">This is a special tip block.</span>`;

  it("parses tip markdown into html correctly", async () => {
    const result = marked.parse(tipMarkdown);
    expect(result).toMatch(expectedOutput);
  });
});
