import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StylingDemo from "./StylingDemo";

describe("StylingDemo component", () => {
  // Heading
  it("renders the heading-xl text", () => {
    render(<StylingDemo />);
    expect(screen.getByText("Heading-xl example")).toBeInTheDocument();
  });
  it("renders the heading-l text", () => {
    render(<StylingDemo />);
    expect(screen.getByText("Heading-l example")).toBeInTheDocument();
  });
  it("renders the heading-m text", () => {
    render(<StylingDemo />);
    expect(screen.getByText("Heading-m example")).toBeInTheDocument();
  });
  it("renders the heading-s text", () => {
    render(<StylingDemo />);
    expect(screen.getByText("Heading-s example")).toBeInTheDocument();
  });

  // Spacing
  it("renders the spacing-2xs example", () => {
    render(<StylingDemo />);
    expect(screen.getByText("spacing-2xs example")).toBeInTheDocument();
  });
  it("renders the spacing-xs example", () => {
    render(<StylingDemo />);
    expect(screen.getByText("spacing-xs example")).toBeInTheDocument();
  });
  it("renders the spacing-sm example", () => {
    render(<StylingDemo />);
    expect(screen.getByText("spacing-sm example")).toBeInTheDocument();
  });
  it("renders the spacing-md example", () => {
    render(<StylingDemo />);
    expect(screen.getByText("spacing-md example")).toBeInTheDocument();
  });
  it("renders the spacing-lg example", () => {
    render(<StylingDemo />);
    expect(screen.getByText("spacing-lg example")).toBeInTheDocument();
  });
  it("renders the spacing-2xl example", () => {
    render(<StylingDemo />);
    expect(screen.getByText("spacing-2xl example")).toBeInTheDocument();
  });
});
