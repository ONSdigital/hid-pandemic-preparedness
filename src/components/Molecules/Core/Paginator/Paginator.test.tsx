import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { v4 as uuidv4 } from "uuid";
import "@testing-library/jest-dom";

import type { PaginatorProps } from "./Paginator.interface";
import { Paginator } from "./Paginator";

describe("Paginator component", () => {
  const baseProps: PaginatorProps = {
    ariaLabel: "Test page navigation",
    perPage: 10,
    // Create 100 items
    items: Array.from({ length: 100 }, () => ({ _uid: uuidv4() })),
  };

  test("renders setting top level nav aria-role correctly", () => {
    render(<Paginator {...baseProps} />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveAttribute("aria-label", baseProps.ariaLabel);
  });

  test("renders setting top level nav aria-role correctly", () => {
    render(<Paginator {...baseProps} />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveAttribute("aria-label", baseProps.ariaLabel);
  });
});
