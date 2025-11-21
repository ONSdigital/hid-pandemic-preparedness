import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import { describe, expect, test } from "vitest";

import type { TipProps } from "./Tip.interface";
import { Tip } from "./Tip";

describe("Tip component", () => {
  const tipText: string =
    "If you're surveying students or children, check the specific demographic themes tailored to those groups.";
  const baseProps: TipProps = {
    _uid: uuidv4(),
    component: "Tip",
    text: tipText,
  };

  test("renders with input text", () => {
    render(<Tip {...baseProps} />);
    expect(screen.getByText(tipText)).toBeDefined();
  });
});
