import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import { describe, expect, test } from "vitest";

import type { FormulaProps } from "./Formula.interface";
import { Formula } from "./Formula";

describe("Formula component", () => {
  const formulaText: string = "Mₖ = (dₖ / pₖ) × 1,000";
  const baseProps: FormulaProps = {
    _uid: uuidv4(),
    component: "Formula",
    text: formulaText,
  };

  test("renders with input text", () => {
    render(<Formula {...baseProps} />);
    expect(screen.getByText(formulaText)).toBeDefined();
  });
});
