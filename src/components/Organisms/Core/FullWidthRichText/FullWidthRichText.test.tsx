import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

// Importing raw here to avoid typescript errors when parsing strings to enums
import fullWidthRichTextProps from "./full-width-rich-text.json?raw";
import type { FullWidthRichTextProps } from "./FullWidthRichText.interface";
import { FullWidthRichText } from "./FullWidthRichText";

describe("FullWidthRichText component", () => {
  const baseProps: FullWidthRichTextProps = {
    ...JSON.parse(fullWidthRichTextProps),
  };

  test("renders component without error", () => {
    const component = render(<FullWidthRichText {...baseProps} />);
    expect(component).toBeDefined();
  });
});
