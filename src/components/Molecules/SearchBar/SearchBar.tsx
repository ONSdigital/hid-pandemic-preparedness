import clsx from "clsx";
import { useState, useRef, type ChangeEvent, type FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { RiArrowRightLine, RiSearchLine } from "@remixicon/react";

import type {
  SearchBarProps,
} from "./SearchBar.interface";
import styles from "./SearchBar.module.scss";
import { SearchResults } from "@components/Molecules/SearchResults/SearchResults";
import breakpoints from "@src/styles/global/overrides/_breakpoints.module.scss";
import strings from "@src/content/strings.json";
import { Button } from "@src/components/Button/Button";
import { usePagefind } from "@src/hooks/usePagefind";

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
  const [isFocused, setIsFocused] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchContainerRef = useRef<HTMLFormElement | null>(null);
  const isMobile = useMediaQuery();
  const { 
    searchInput, 
    setSearchInput, 
    allResults,
    runSearch, 
    initPagefind 
  } = usePagefind(isClient, props.initialQuery);



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

  const handleFocus = () => {
    setIsFocused(true);
    if (isClient) {
      initPagefind();
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchInput(inputText); 
    runSearch(inputText); 
  };

  useEffect(() => {
    // this hook only runs in the browser
    // so createPortal (below) can safely be called
    setIsClient(true);
  }, []);

  useEffect(() => {
    // re-run search when landing on results page
    // We must wait for isClient to be true before running
    if (props.isResultsPage && isClient) {
      const urlParams = new URLSearchParams(window.location.search);
      const queryFromUrl = urlParams.get("params") || "";

      if (queryFromUrl) {
        setSearchInput(queryFromUrl);
        runSearch(queryFromUrl);
      }
    }
  }, [props.isResultsPage, isClient, runSearch, setSearchInput]);

const showDropdown =
    searchInput && isFocused && allResults.length > 0 && !props.isResultsPage;

  const resultsPortalContainer = isClient
    ? document.getElementById("search-results-portal")
    : null;

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
          aria-label={props.placeholder}
          className={clsx("form-control", styles["input-sizing"])}
          onChange={onChange}
          onFocus={handleFocus}
          placeholder={props.placeholder}
          type="search"
          name="params"
          value={searchInput}
        />
        
        <Button type="submit" variant="secondary" ariaLabel="Search">
          <RiSearchLine />
        </Button>
      </div>

      {showDropdown && (
        <div
          className={clsx(
            "mt-2",
            "w-100",
            props.isInline ? styles["search-results-inline"] : styles["search-results"]
          )}
        >
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
