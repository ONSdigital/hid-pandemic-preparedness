import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { SearchResults } from "./SearchResults";
import styles from "./SearchResults.module.scss";

vi.mock("@src/content/strings.json", () => ({
  default: {
    search: {
      resultsCount: "Showing {start}-{end} of {total} results",
    },
  },
}));

vi.mock("@/src/components/Molecules/Core/Tag/Tag", () => ({
  Tag: ({ label }: { label: string }) => <div>{label}</div>,
}));

const mockResults = [
  {
    link: { href: "/page-1", label: "Page 1" },
    excerpt: "Excerpt 1",
  },
  {
    link: { href: "/page-2", label: "Page 2" },
    excerpt: "Excerpt 2",
    tag: [{ label: "My Tag", id: "1", title: "My Tag" }],
  },
  {
    link: { href: "/page-3", label: "Page 3" },
    excerpt: "Excerpt with <mark>highlight</mark>",
  },
  {
    link: { href: "/page-4", label: "Page 4" },
    excerpt: "Excerpt 4",
  },
  {
    link: { href: "/page-5", label: "Page 5" },
    excerpt: "Excerpt 5",
    tag: [{ label: "My Tag", id: "1", title: "My Tag" }],
  },
  {
    link: { href: "/page-6", label: "Page 6" },
    excerpt: "Excerpt 6",
  },
];

describe("SearchResults component", () => {
  it("renders 'Searching...' when searchResults is null (Loading State)", () => {
    render(<SearchResults searchResults={null} isMobile={false} />);

    expect(screen.getByText("Searching...")).toBeInTheDocument();
    expect(screen.queryByText("No results found")).not.toBeInTheDocument();
  });

  it("renders 'No results found' when searchResults is empty array with input", () => {
    render(
      <SearchResults
        searchResults={[]}
        isMobile={false}
        searchInput="testing"
      />,
    );

    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(screen.getByText(/"testing"/)).toBeInTheDocument();
  });

  it("renders nothing when searchResults is empty and no input provided", () => {
    const { container } = render(
      <SearchResults searchResults={[]} isMobile={false} searchInput="" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders all results and the correct count when no limit is given", () => {
    render(<SearchResults searchResults={mockResults} isMobile={false} />);

    expect(screen.getByText("Page 1")).toBeInTheDocument();
    expect(screen.getByText("Page 2")).toBeInTheDocument();
    expect(screen.getByText("Page 3")).toBeInTheDocument();
    expect(screen.getByText("Page 4")).toBeInTheDocument();
    expect(screen.getByText("Page 5")).toBeInTheDocument();
    expect(screen.getByText("Page 6")).toBeInTheDocument();

    expect(screen.getByText("Showing 1-6 of 6 results")).toBeInTheDocument();
  });

  it("obeys the 'limit' prop and updates count", () => {
    render(
      <SearchResults searchResults={mockResults} isMobile={false} limit={2} />,
    );

    expect(screen.getByText("Page 1")).toBeInTheDocument();
    expect(screen.getByText("Page 2")).toBeInTheDocument();

    expect(screen.queryByText("Page 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Page 4")).not.toBeInTheDocument();
    expect(screen.queryByText("Page 5")).not.toBeInTheDocument();
    expect(screen.queryByText("Page 6")).not.toBeInTheDocument();

    expect(screen.getByText("Showing 1-2 of 6 results")).toBeInTheDocument();
  });

  it("correctly applies 'isLast' (border) when limited", () => {
    render(
      <SearchResults searchResults={mockResults} isMobile={false} limit={2} />,
    );

    // Item 1 is not last, so it has a border
    const item1 = screen.getByText("Page 1").parentElement!;
    expect(item1.className).toContain("border-bottom");

    // Item 2 is now last, so it should NOT have a border
    const item2 = screen.getByText("Page 2").parentElement!;
    expect(item2.className).not.toContain("border-bottom");
  });

  it("applies the truncation class when 'isMobile' is true", () => {
    render(<SearchResults searchResults={mockResults} isMobile={true} />);

    const excerpt1 = screen.getByText("Excerpt 1");
    expect(excerpt1.className).toContain(styles["truncate-excerpt"]);
  });

  it("does NOT apply truncation class when 'isMobile' is false", () => {
    render(<SearchResults searchResults={mockResults} isMobile={false} />);

    const excerpt1 = screen.getByText("Excerpt 1");
    expect(excerpt1.className).not.toContain(styles["truncate-excerpt"]);
  });

  it("conditionally renders the Tag component", () => {
    render(<SearchResults searchResults={mockResults} isMobile={false} />);

    const item2 = screen.getByText("Page 2").parentElement!;

    expect(within(item2).getByText("My Tag")).toBeInTheDocument();

    const item1 = screen.getByText("Page 1").parentElement!;

    expect(within(item1).queryByText("My Tag")).not.toBeInTheDocument();
  });

  it("correctly renders 'dangerouslySetInnerHTML' content", () => {
    render(<SearchResults searchResults={mockResults} isMobile={false} />);

    const highlight = screen.getByText("highlight");
    expect(highlight).toBeInTheDocument();
    expect(highlight.tagName).toBe("MARK");
  });
});
