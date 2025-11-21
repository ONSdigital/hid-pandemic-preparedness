import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

import type { PaginatorProps } from "./Paginator.interface";
import { Paginator } from "./Paginator";

describe("Paginator component", () => {
  const mockOnPageChange = vi.fn();

  const baseProps: PaginatorProps = {
    ariaLabel: "Test page navigation",
    totalPages: 10,
    currentPage: 0,
    onPageChange: mockOnPageChange,
  };

  test("renders setting top level nav aria-role correctly", () => {
    render(<Paginator {...baseProps} />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveAttribute("aria-label", baseProps.ariaLabel);
  });

  test("renders mobile summary text with correct classes", () => {
    render(<Paginator {...baseProps} />);
    const mobileText = screen.getByText("Page 1 of 10");

    expect(mobileText).toBeInTheDocument();

    // Check parent for mobile-only class (d-md-none)
    expect(mobileText.closest("li")).toHaveClass("d-md-none");
  });

  test("fires callback when next button is clicked", () => {
    render(<Paginator {...baseProps} />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
