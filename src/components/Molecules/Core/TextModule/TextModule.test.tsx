import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import { TextModule } from "./TextModule";

describe("TextModule component", () => {
  const htmlContent: string =
    "<p>Mortality analysis involves examining data on deaths to understand patterns, causes, and trends across populations. It includes calculating mortality rates, analysing causes of death, and interpreting life expectancy.</p>";

  test("renders if valid `htmlContent` prop is supplied", () => {
    render(<TextModule htmlContent={htmlContent} />);
    // Inner html should match supplied content
    const div = screen.getByTestId("text-module");
    expect(div.innerHTML).toBe(htmlContent);
  });
  test("renders if valid `richText` prop is supplied", () => {
    const richTextJson = `{
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "text": "Mortality analysis involves examining data on deaths to understand patterns, causes, and trends across populations. It includes calculating mortality rates, analysing causes of death, and interpreting life expectancy.",
              "type": "text"
            }
          ]
        }
      ]
    }`;

    render(<TextModule richText={JSON.parse(richTextJson)} />);
    // Inner html should match supplied content
    const div = screen.getByTestId("text-module");
    expect(div.innerHTML).toBe(htmlContent);
  });
});
