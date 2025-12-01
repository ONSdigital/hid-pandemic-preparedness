import clsx from "clsx";
import { useState, useRef, type ChangeEvent, type FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { RiArrowRightLine, RiSearchLine } from "@remixicon/react";

import type { SearchBarProps } from "./SearchBar.interface";
import styles from "./SearchBar.module.scss";
import { SearchResults } from "@src/components/Molecules/SearchResults/SearchResults";

import { Paginator } from "@src/components/Molecules/Core/Paginator/Paginator";

import strings from "@src/content/strings.json";
import { Button } from "@src/components/Button/Button";
import { usePagefind } from "@src/hooks/usePagefind";
import { usePagination } from "@src/hooks/usePagination";
import { useMediaQuery } from "@src/hooks/useMediaQuery";

const RESULTS_PER_PAGE = 10;

export const SearchBar: FC<SearchBarProps> = (props) => {
  const {
    search: { viewAllResults },
  } = strings;
  const [isFocused, setIsFocused] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [urlPageIndex, setUrlPageIndex] = useState(0);

  const searchContainerRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsTopRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery();

  const { searchInput, setSearchInput, allResults, runSearch, initPagefind } =
    usePagefind(isClient, props.initialQuery);

  const { currentPage, totalPages, currentItems } = usePagination({
    data: allResults,
    itemsPerPage: RESULTS_PER_PAGE,
    initialPage: urlPageIndex,
  });

  const updateUrl = (params: { term?: string; page?: number }) => {
    if (!isClient) return;
    const url = new URL(window.location.href);

    if (params.term !== undefined) {
      if (params.term) url.searchParams.set("params", params.term);
      else url.searchParams.delete("params");
    }

    const newPage = params.term !== undefined ? 1 : params.page;

    if (newPage && newPage > 1) {
      url.searchParams.set("page", newPage.toString());
    } else {
      url.searchParams.delete("page");
    }

    if (params.term !== undefined) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }

    parseUrlAndSync();
  };

  const parseUrlAndSync = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const pageParam = parseInt(urlParams.get("page") || "1", 10);
    const targetIndex = pageParam > 0 ? pageParam - 1 : 0;
    setUrlPageIndex(targetIndex);

    const queryParam = urlParams.get("params") || "";
    if (queryParam !== searchInput) {
      setSearchInput(queryParam);
      if (queryParam) runSearch(queryParam);
    }
  };

  useEffect(() => {
    // only inject query string params when on search results page
    if (!props.isResultsPage || !isClient) return;

    // debounce updates while user still typing
    const timer = setTimeout(() => {
      const currentUrlParam =
        new URLSearchParams(window.location.search).get("params") || "";
      if (searchInput !== currentUrlParam) {
        updateUrl({ term: searchInput });
      }
    }, 300);

    // clean up
    return () => clearTimeout(timer);
  }, [searchInput, props.isResultsPage, isClient]);

  useEffect(() => {
    // this hook only runs in the browser
    // so createPortal (below) can safely be called
    setIsClient(true);
  }, []);

  // Replaces 'autoFocus' to ensure we control the timing.
  useEffect(() => {
    if (props.isInline && inputRef.current) {
      inputRef.current.focus();
      if (document.activeElement === inputRef.current) {
        setIsFocused(true);
      }
    }
  }, [props.isInline]);

  // Initialize Pagefind only when focused
  useEffect(() => {
    if (isClient && isFocused) {
      initPagefind();
    }
  }, [props.isInline, isClient]);

  useEffect(() => {
    window.addEventListener("popstate", parseUrlAndSync);
    return () => window.removeEventListener("popstate", parseUrlAndSync);
  }, [searchInput]);

  useEffect(() => {
    // re-run search when landing on results page
    // isClient must be true to run search
    if (props.isResultsPage && isClient) {
      parseUrlAndSync();
    }
  }, [props.isResultsPage, isClient]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;

    if (inputText && !isFocused) setIsFocused(true);

    setSearchInput(inputText);
    runSearch(inputText);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (isClient) initPagefind();
  };

  const handlePageChange = (pageIndex: number) => {
    const pageNumber = pageIndex + 1;
    updateUrl({ page: pageNumber });

    if (resultsTopRef.current) {
      resultsTopRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    // prevents navbar click that opens search bubbling up and triggering the close listener immediately
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    // Clean up - remove listener on unmount
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const showDropdown =
    searchInput.trim().length > 0 && isFocused && !props.isResultsPage;
  const resultsPortalContainer = isClient
    ? document.getElementById("search-results-portal")
    : null;

  const resultsPageStartingIndex = currentPage * RESULTS_PER_PAGE;

  return (
    <form
      role="search"
      ref={searchContainerRef}
      className={clsx("text-dark", styles["input-bg"])}
      action="/search"
      method="GET"
    >
      <div className={clsx("input-group", "mb-3")}>
        <input
          ref={inputRef}
          aria-label={props.placeholder}
          className={clsx("form-control", styles["input-sizing"])}
          onChange={onChange}
          onFocus={handleFocus}
          placeholder={props.placeholder}
          type="search"
          name="params"
          value={searchInput}
        />
        <Button
          type="submit"
          variant="secondary"
          ariaLabel="Search"
          className={styles["search-btn"]}
        >
          <RiSearchLine />
        </Button>
      </div>

      {showDropdown && (
        // search input entered
        <div
          className={clsx(
            "mt-2",
            "w-100",
            props.isInline
              ? styles["search-results-inline"]
              : styles["search-results"],
          )}
        >
          {allResults.length > 0 ? (
            // search results found
            <>
              <SearchResults
                searchResults={allResults}
                isMobile={isMobile}
                limit={5}
                startingItemIndex={0}
                searchInput={searchInput}
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
            </>
          ) : (
            // searchInput entered but no results found
            <div className="p-4 text-center">
              <p className="text-secondary mb-0">
                No results found for{" "}
                <span className="text-dark fw-semibold">"{searchInput}"</span>
              </p>
            </div>
          )}
        </div>
      )}

      {props.isResultsPage &&
        searchInput.trim().length > 0 &&
        isClient &&
        resultsPortalContainer &&
        createPortal(
          <div className="container-lg">
            <div ref={resultsTopRef} className="bg-white rounded-3 p-4 p-md-5">
              <SearchResults
                searchResults={currentItems}
                isMobile={isMobile}
                totalResults={allResults.length}
                startingItemIndex={resultsPageStartingIndex}
                searchInput={searchInput}
              />

              {totalPages > 1 && (
                <div className="mt-5 d-flex justify-content-center">
                  <Paginator
                    ariaLabel="Search results pagination"
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>,
          resultsPortalContainer,
        )}
    </form>
  );
};
