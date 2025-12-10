import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Code } from "./Code";
import mockData from "./code.json?raw";

const defaultProps = JSON.parse(mockData);

describe("Code", () => {
  it("renders without crashing", () => {
    render(<Code {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeDefined();
    expect(screen.getByText(defaultProps.languages[0].language)).toBeDefined();
  });
});
