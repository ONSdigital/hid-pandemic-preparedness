import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

// Importing raw here to avoid typescript errors when parsing strings to enums
import richTextProps from "./rich-text.json?raw";
import type { RichTextProps } from "./RichText.interface";
import { RichText } from "./RichText";

describe("RichText component", () => {
  const baseProps: RichTextProps = {
    ...JSON.parse(richTextProps),
  };

  test("renders component without error", () => {
    const component = render(<RichText {...baseProps} />);
    expect(component).toBeDefined();
  });
});
