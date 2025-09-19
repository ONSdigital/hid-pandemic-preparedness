import path from "path";
import { describe, it, expect } from "vitest";

import { createLearningSections } from "./createLearningSections";

describe("createLearningSections", () => {
  // Use an actual content file path for this
  const markdownFilepath = path.resolve(
    __dirname,
    "../content/learning-resources/data-analysis/epidemiological-analysis/introduction-to-mortality-analysis/1/content.md",
  );
  it("parses markdown into learning sections correctly", async () => {
    const result = await createLearningSections(markdownFilepath);

    expect(result).toHaveLength(4);

    expect(result[0]).toMatchObject({
      title: "Definition of Importance of Mortality Analysis",
    });
  });
});
