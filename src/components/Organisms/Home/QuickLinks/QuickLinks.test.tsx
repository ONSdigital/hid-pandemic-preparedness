import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuickLinks } from "./QuickLinks";

import type { QuickLinksProps } from "./QuickLinks.interface";
import quickLinksData from "./quicklinks.json";

const defaultProps: QuickLinksProps = quickLinksData as QuickLinksProps;

// Mock the Link component
vi.mock("@components/Molecules/Core/Link/Link", () => ({
  Link: ({
    id,
    text,
    href,
    className,
  }: {
    id?: string;
    text: string;
    href?: string;
    className?: string;
  }) => (
    <a data-testid={`link-${id}`} href={href} className={className} role="link">
      {text}
    </a>
  ),
}));

describe("QuickLinks component", () => {
  it("renders title and subtitle", () => {
    render(<QuickLinks {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subTitle)).toBeInTheDocument();
  });

  it("renders the correct number of links", () => {
    render(<QuickLinks {...defaultProps} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });
});
