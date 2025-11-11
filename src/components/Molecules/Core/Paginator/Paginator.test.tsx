import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import type { PaginatorProps } from "./Paginator.interface";
import { Paginator } from "./Paginator";

describe("Paginator component", () => {
  const baseProps: PaginatorProps = {
    ariaLabel: "Test page navigation",
    perPage: 10,
    total: 100,
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
