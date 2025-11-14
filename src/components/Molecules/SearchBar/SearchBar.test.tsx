import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from "vitest";
import * as ReactDOM from "react-dom";

import type { SearchResultData } from "@src/types/Search.ts";
import { SearchBar } from "./SearchBar";

// Mock Pagefind
const mockDebouncedSearch = vi.fn();
vi.mock("/pagefind/pagefind.js", () => ({
  init: vi.fn().mockResolvedValue(true),
  debouncedSearch: mockDebouncedSearch,
}));

// Mock createPortal
vi.mock("react-dom", async (importOriginal) => {
  const original = await importOriginal<typeof ReactDOM>();
  return {
    ...original,
    createPortal: (children: React.ReactNode) => children,
  };
});

// Mock SearchResults
vi.mock("@components/Molecules/SearchResults/SearchResults", () => ({
  SearchResults: (props: {
    searchResults: SearchResultData[];
    isMobile: boolean;
    limit?: number;
  }) => (
    <div data-testid="search-results-mock">
      <pre>{JSON.stringify(props)}</pre>
    </div>
  ),
}));

// Mock breakpointMd
vi.mock("@src/styles/global/overrides/_breakpoints.module.scss", () => ({
  default: {
    breakpointMd: "768",
  },
}));

// Mock strings.json
vi.mock("@src/content/strings.json", () => ({
  default: {
    search: {
      viewAllResults: "View all results",
    },
  },
}));

// Mock Pagefind data
const createMockResults = (count: number): SearchResultData[] => {
  return Array.from({ length: count }, (_, i) => ({
    link: { href: `/page-${i + 1}`, label: `Page ${i + 1}` },
    excerpt: `Excerpt ${i + 1}`,
  }));
};

// Mock Pagefind response
const createPagefindResponse = (count: number) => {
  const results = createMockResults(count);
  return {
    results: results.map((r) => ({
      data: () =>
        Promise.resolve({
          meta: { title: r.link.label },
          sub_results: [
            {
              title: r.link.label,
              url: r.link.href,
              excerpt: r.excerpt,
            },
          ],
        }),
    })),
  };
};

let windowWidthSpy: MockInstance;
let windowLocationSpy: MockInstance;

beforeEach(() => {
  const portalEl = document.createElement("div");
  portalEl.id = "search-results-portal";
  document.body.appendChild(portalEl);

  windowWidthSpy = vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
  windowLocationSpy = vi
    .spyOn(window, "location", "get")
    .mockReturnValue({ ...window.location, search: "" });

  vi.clearAllMocks();
  mockDebouncedSearch.mockResolvedValue(createPagefindResponse(6));
});

afterEach(() => {
  windowWidthSpy.mockRestore();
  windowLocationSpy.mockRestore();
  document.body.innerHTML = "";
});

describe("SearchBar (Dropdown Mode, isResultsPage={false})", () => {
  it("calls runSearch on input change and focus", async () => {
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} />);
    const input = screen.getByPlaceholderText("Search");

    await act(async () => {
      await user.click(input);
    });
    expect(mockDebouncedSearch).not.toHaveBeenCalled();

    await act(async () => {
      await user.type(input, "test");
    });
    expect(mockDebouncedSearch).toHaveBeenCalledWith("test");
  });

  it("shows dropdown with limit={5} when results exist", async () => {
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} />);
    const input = screen.getByPlaceholderText("Search");

    await act(async () => {
      await user.type(input, "hello");
    });

    expect(screen.getByText("View all results")).toBeInTheDocument();

    const resultsMock = screen.getByTestId("search-results-mock");
    expect(resultsMock).toBeInTheDocument();

    const props = JSON.parse(resultsMock.textContent || "{}");
    expect(props.limit).toBe(5);
    expect(props.searchResults.length).toBe(6);
  });

  it("closes dropdown on outside click", async () => {
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} />);
    const input = screen.getByPlaceholderText("Search");

    await act(async () => {
      await user.type(input, "hello");
    });
    expect(screen.getByText("View all results")).toBeInTheDocument();

    await act(async () => {
      await user.click(document.body);
    });

    expect(screen.queryByText("View all results")).not.toBeInTheDocument();
  });
});

describe("SearchBar (Results Page Mode, isResultsPage={true})", () => {
  it("runs search on mount using query from URL", async () => {
    windowLocationSpy.mockReturnValue({
      ...window.location,
      search: "?params=urlquery",
    });

    render(<SearchBar placeholder="Search" isResultsPage={true} />);

    await waitFor(() => {
      expect(mockDebouncedSearch).toHaveBeenCalledWith("urlquery");
    });

    const input = screen.getByPlaceholderText("Search") as HTMLInputElement;
    expect(input.value).toBe("urlquery");
  });

  it("renders all results to portal (no limit)", async () => {
    windowLocationSpy.mockReturnValue({
      ...window.location,
      search: "?params=urlquery",
    });

    render(<SearchBar placeholder="Search" isResultsPage={true} />);

    const resultsMock = await screen.findByTestId("search-results-mock");

    const props = JSON.parse(resultsMock.textContent || "{}");
    expect(props.limit).toBeUndefined();
    expect(props.searchResults.length).toBe(6);

    expect(screen.queryByText("View all results")).not.toBeInTheDocument();
  });
});

describe("SearchBar (useMediaQuery)", () => {
  it("passes isMobile={true} when window is small", async () => {
    windowWidthSpy.mockReturnValue(300); // mobile
    const user = userEvent.setup();

    render(<SearchBar placeholder="Search" isResultsPage={false} />);
    const input = screen.getByPlaceholderText("Search");

    await act(async () => {
      await user.type(input, "hello");
    });

    const resultsMock = await screen.findByTestId("search-results-mock");
    const props = JSON.parse(resultsMock.textContent || "{}");
    expect(props.isMobile).toBe(true);
  });

  it("passes isMobile={false} when window is large", async () => {
    windowWidthSpy.mockReturnValue(1024); // desktop
    const user = userEvent.setup();

    render(<SearchBar placeholder="Search" isResultsPage={false} />);
    const input = screen.getByPlaceholderText("Search");

    await act(async () => {
      await user.type(input, "hello");
    });

    const resultsMock = await screen.findByTestId("search-results-mock");
    const props = JSON.parse(resultsMock.textContent || "{}");
    expect(props.isMobile).toBe(false);
  });
});
