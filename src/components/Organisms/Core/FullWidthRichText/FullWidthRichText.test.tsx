import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import fullWidthRichTextProps from "./full-width-rich-text.json";
import type { FullWidthRichTextProps } from "./FullWidthRichText.interface";
import { FullWidthRichText } from "./FullWidthRichText";

describe("FullWidthRichText component", () => {
  const baseProps: FullWidthRichTextProps = {
    ...fullWidthRichTextProps,
  };

  test("renders component without error", () => {
    const component = render(<FullWidthRichText {...baseProps} />);
    expect(component).toBeDefined();
  });
});
