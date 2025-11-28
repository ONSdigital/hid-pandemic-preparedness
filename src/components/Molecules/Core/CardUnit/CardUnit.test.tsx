import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardUnit } from "./CardUnit";
import mockData from "./cardUnit.json?raw";

const defaultProps = JSON.parse(mockData);

describe("CardUnit", () => {
  it("renders without crashing", () => {
    render(<CardUnit {...defaultProps} />);
    expect(screen.getByText(defaultProps.link.label)).toBeDefined();
    expect(screen.getByText(defaultProps.subTitle)).toBeDefined();
  });
});
