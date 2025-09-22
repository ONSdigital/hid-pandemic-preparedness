import { describe, it, expect } from "vitest";

import { createQuestionBlock } from "./createQuestionBlock";

const testMarkdownContent: string =
  "# Ethnicity\n" +
  "\n" +
  "**1. What is your ethnic group?**\n" +
  "\n" +
  "- White\n" +
  "- Mixed / Multiple ethnic groups\n" +
  "- Asian / Asian British\n" +
  "- Black / African / Caribbean / Black British\n" +
  "- Chinese\n" +
  "- Arab\n" +
  "- Other ethnic group\n" +
  "- Prefer not to say\n" +
  "\n" +
  "**2. What is your ethnic group? I will read out the options. Please choose one option that best describes your ethnic group or background.**\n" +
  "\n" +
  "- White\n" +
  "- Mixed / Multiple ethnic groups\n" +
  "- Asian / Asian British\n" +
  "- Black / African / Caribbean / Black British\n" +
  "- Chinese\n" +
  "- Arab\n" +
  "- Other ethnic group\n" +
  "- Prefer not to say";

describe("createQuestionBlocks", () => {
  it("parses markdown into a question block correctly", async () => {
    const result = await createQuestionBlock(testMarkdownContent);

    expect(result).toMatchObject({
      title: "Ethnicity",
    });

    expect(result.questions).toHaveLength(2);
  });
});
