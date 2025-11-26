import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UnitBlock } from "./UnitBlock";
import mockData from "./unitBlock.json";

import type { UnitBlockProps } from "./UnitBlock.interface";
const defaultProps: UnitBlockProps = mockData as UnitBlockProps;

describe("UnitBlock", () => {
  it("renders without crashing", () => {
    render(<UnitBlock {...defaultProps} />);
    expect(
      screen.getByText("All units within Epidemiological Analysis"),
    ).toBeDefined();
  });
});
