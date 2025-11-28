import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UnitBlock } from "./UnitBlock";
import mockData from "./unitBlock.json?raw";

const defaultProps = JSON.parse(mockData);

describe("UnitBlock", () => {
  it("renders without crashing", () => {
    render(<UnitBlock {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeDefined();
  });
});
