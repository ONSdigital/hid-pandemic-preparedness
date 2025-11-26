import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardUnit } from "./CardUnit";
import mockData from "./cardUnit.json";

import type { CardUnitProps } from "./CardUnit.interface";
const defaultProps: CardUnitProps = mockData as CardUnitProps;

describe("CardUnit", () => {
  it("renders without crashing", () => {
    render(<CardUnit {...defaultProps} />);
    expect(screen.getByText("Basic Data Visualisation")).toBeDefined();
    expect(
      screen.getByText("Using 7-1-7 to Strengthen Uganda’s Health Security."),
    ).toBeDefined();
  });
});
