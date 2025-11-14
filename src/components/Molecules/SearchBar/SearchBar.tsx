import clsx from "clsx";
import { useState, useRef, type ChangeEvent, type FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { RiArrowRightLine, RiSearchLine } from "@remixicon/react";

import type {
  PagefindResultsData,
  PagefindSubResult,
  SearchBarProps,
} from "./SearchBar.interface";
import styles from "./SearchBar.module.scss";
import { SearchResults } from "@components/Molecules/SearchResults/SearchResults";
import breakpoints from "@src/styles/global/overrides/_breakpoints.module.scss";
import strings from "@src/content/strings.json";
import { Button } from "../../Button/Button";
import type { SearchResultData } from "@src/types/Search.ts";

type PagefindModule = {
  init: () => Promise<void>;
  /* eslint-disable no-unused-vars */ // avoids unused var 'term' in debouncedSearch function 
  debouncedSearch: (term: string) => Promise<{
    results: {
      data: () => Promise<PagefindResultsData>;
    }[];
  } | null>;
};

const breakpointMd = parseInt(breakpoints.breakpointMd);

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      return setIsMobile(window.innerWidth < breakpointMd);
    };

    checkIsMobile(); // run once on component mount

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

export const SearchBar: FC<SearchBarProps> = (props) => {
  const {
    search: { viewAllResults },
  } = strings;
  const [searchInput, setSearchInput] = useState(props.initialQuery || "");
  const [isFocused, setIsFocused] = useState(false);
  const [allResults, setAllResults] = useState<SearchResultData[]>([]);
  const [isClient, setIsClient] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const pagefind = useRef<PagefindModule | null>(null);

  const isMobile = useMediaQuery();

  useEffect(() => {
    // Check for clicks outside the referenced element (search container)
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) // If click isn't inside
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside); // Clean up - remove listener on unmount
    };
  }, []);

  const runSearch = async (term: string) => {
    if (!pagefind.current) {
      // standard Pagefind implementation requires ts-ignore because pagefind.js does not
      // exist at build time (astro-pagefind creates the pagefind directory from the build output),
      // causing compilation errors for TS
      try {
        // @ts-ignore
        const pf = await import("/pagefind/pagefind.js");
        await pf.init();
        pagefind.current = pf;
        if (!pagefind.current) return;
      } catch (e) {
        console.error("Failed to initialise Pagefind", e);
        return;
      }
    }

    if (!term) {
      setAllResults([]);
      return;
    }

    try {
      const search = await pagefind.current.debouncedSearch(term);

      // pagefind drops debounced searches resolving them to null, so the following line closes these
      if (!search) return;

      // only the non-debounced search (within a 300ms window) will execute and resolve to results
      const loadedResults: PagefindResultsData[] = await Promise.all(
        search.results.map((r: any) => r.data()),
      );

      const finalResults: SearchResultData[] = loadedResults.flatMap(
        (pagefindResults: PagefindResultsData) => {
          const tagObject = pagefindResults.meta?.tag
            ? { ...pagefindResults.meta.tag }
            : undefined;

          return pagefindResults.sub_results.map(
            (subResult: PagefindSubResult) => {
              const resultItem: SearchResultData = {
                link: {
                  href: subResult.url,
                  label: subResult.title,
                },
                excerpt: subResult.excerpt,
              };

              if (tagObject) {
                resultItem.tag = tagObject;
              }

              return resultItem;
            },
          );
        },
      );

      setAllResults(finalResults);
    } catch (e) {
      console.error("Pagefind search failed:", e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!pagefind.current) {
      runSearch(searchInput);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchInput(inputText);
    runSearch(inputText);
  };

  useEffect(() => {
    // This runs on mount
    setIsClient(true); // Now we know we're in the browser

    if (props.isResultsPage) {
      // Read URL from the window
      const urlParams = new URLSearchParams(window.location.search);
      const queryFromUrl = urlParams.get("params") || "";

      if (queryFromUrl) {
        setSearchInput(queryFromUrl);
        runSearch(queryFromUrl);
      }
    }
  }, [props.isResultsPage]);

  const showDropdown =
    searchInput && isFocused && allResults.length > 0 && !props.isResultsPage;

  const resultsPortalContainer = isClient
    ? document.getElementById("search-results-portal")
    : null;

  return (
    <form
      role="search"
      className={clsx("text-dark", styles["input-bg"])}
      action="/search"
      method="GET"
    >
      <div ref={searchContainerRef} className={clsx("input-group", "mb-3")}>
        <input
          aria-label={props.placeholder}
          className={clsx("form-control", styles["input-sizing"])}
          onChange={onChange}
          onFocus={handleFocus}
          placeholder={props.placeholder}
          type="search"
          name="params"
          value={searchInput}
        />
        {showDropdown && (
          <div className={clsx("mt-2", "w-100", styles["search-results"])}>
            <SearchResults
              searchResults={allResults}
              isMobile={isMobile}
              limit={5}
            />
            <div
              className={clsx(
                "p-3",
                "bg-light",
                "d-flex",
                "justify-content-center",
                styles["sticky-link-container"],
              )}
            >
              <a
                href={`/search?params=${encodeURIComponent(searchInput)}`}
                className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover fw-medium"
              >
                {viewAllResults} <RiArrowRightLine />
              </a>
            </div>
          </div>
        )}

        <Button type="submit" variant="secondary" ariaLabel="Search">
          <RiSearchLine />
        </Button>
      </div>

      {props.isResultsPage &&
        isClient &&
        resultsPortalContainer &&
        allResults.length > 0 &&
        createPortal(
          <div className="container-lg">
            <div className="bg-white rounded-3 p-4 p-md-5">
              <SearchResults searchResults={allResults} isMobile={isMobile} />
            </div>
          </div>,
          resultsPortalContainer,
        )}
    </form>
  );
};
