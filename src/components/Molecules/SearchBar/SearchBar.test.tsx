import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
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
import React, { useState } from "react";
import type { SearchResultData } from "@src/types/Search.ts";
import { SearchBar } from "./SearchBar";

const mockInitPagefind = vi.fn().mockResolvedValue(undefined);
const onRunSearchSpy = vi.fn(); 
const onSetSearchInputSpy = vi.fn();

// Mock Pagefind Hook
vi.mock("@src/hooks/usePagefind", () => ({
  usePagefind: (isClient: boolean, initialQuery: string | undefined) => {
    const [searchInput, setSearchInput] = useState(initialQuery || "");
    const [allResults, setAllResults] = useState<SearchResultData[]>([]);

    const runSearch = async (term: string) => {
      onRunSearchSpy(term);
      
      await Promise.resolve();
      
      if (term) {
        setAllResults(createMockResults(6));
      } else {
        setAllResults([]);
      }
    };

    const wrappedSetSearchInput = (input: string) => {
        onSetSearchInputSpy(input);
        setSearchInput(input);
    };

    return {
      searchInput,
      allResults,
      setSearchInput: wrappedSetSearchInput,
      runSearch,
      initPagefind: mockInitPagefind,
    };
  },
}));

// Mock Styles
vi.mock("./SearchBar.module.scss", () => ({
  default: new Proxy({}, {
    get: (target, prop) => String(prop),
  }),
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

// MOck string.json
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
  mockInitPagefind.mockResolvedValue(undefined);
});

afterEach(() => {
  windowWidthSpy.mockRestore();
  windowLocationSpy.mockRestore();
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

describe("SearchBar (Immediate Search Mode, isResultsPage={false})", () => {
  
  it("calls runSearch immediately on input change", async () => {
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} />);

    const input = screen.getByPlaceholderText("Search");
    await user.click(input);

    await user.type(input, "t");
    
    await waitFor(() => {
      expect(onRunSearchSpy).toHaveBeenCalledWith("t");
    });
    
    await user.type(input, "e");
    await waitFor(() => {
      expect(onRunSearchSpy).toHaveBeenCalledWith("te");
    });
  });

  it("shows dropdown with limit={5} when results exist", async () => {
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} />);

    const input = screen.getByPlaceholderText("Search");
    await user.click(input); 

    await user.type(input, "hello");
    
    const resultsMock = await screen.findByTestId("search-results-mock");

    expect(screen.getByText("View all results")).toBeInTheDocument();
    const props = JSON.parse(resultsMock.textContent || "{}");
    expect(props.limit).toBe(5);
    expect(props.searchResults.length).toBe(6);
  });

  it("closes dropdown on outside click (ref on form)", async () => {
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} />);

    const input = screen.getByPlaceholderText("Search");
    await user.click(input);
    await user.type(input, "hello");
    
    await screen.findByText("View all results");

    await user.click(document.body);

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
      expect(onSetSearchInputSpy).toHaveBeenCalledWith("urlquery");
      expect(onRunSearchSpy).toHaveBeenCalledWith("urlquery");
    });
    
    await screen.findByTestId("search-results-mock"); 
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

describe("SearchBar (Inline Mode)", () => {
  it("applies 'search-results-inline' class when isInline={true}", async () => {
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} isInline={true} />);

    const input = screen.getByPlaceholderText("Search");
    await user.click(input); 
    await user.type(input, "test");
    
    const resultsMock = await screen.findByTestId("search-results-mock");
    const dropdownWrapper = resultsMock.closest(".search-results-inline");
    
    expect(dropdownWrapper).toBeInTheDocument();
    expect(dropdownWrapper).toHaveClass("search-results-inline");
  });
});

describe("SearchBar (useMediaQuery)", () => {
  it("passes isMobile={true} when window is small", async () => {
    windowWidthSpy.mockReturnValue(300); 
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} />);

    const input = screen.getByPlaceholderText("Search");
    await user.click(input); 
    await user.type(input, "hello");

    const resultsMock = await screen.findByTestId("search-results-mock");
    const props = JSON.parse(resultsMock.textContent || "{}");
    expect(props.isMobile).toBe(true);
  });

  it("passes isMobile={false} when window is large", async () => {
    windowWidthSpy.mockReturnValue(1024);
    const user = userEvent.setup();
    render(<SearchBar placeholder="Search" isResultsPage={false} />);

    const input = screen.getByPlaceholderText("Search");
    await user.click(input); 
    await user.type(input, "hello");

    const resultsMock = await screen.findByTestId("search-results-mock");
    const props = JSON.parse(resultsMock.textContent || "{}");
    expect(props.isMobile).toBe(false);
  });
});