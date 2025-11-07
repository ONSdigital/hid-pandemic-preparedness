/* eslint-disable no-unused-vars */
import clsx from "clsx";
import { useState, useRef, type ChangeEvent, type FC, useEffect } from "react";
import { RiSearchLine } from "@remixicon/react";

import type {
  PagefindResultsData,
  PagefindSubResult,
  SearchBarProps,
} from "./SearchBar.interface";
import styles from "./SearchBar.module.scss";
import type { SearchResultItemProps } from "@components/Molecules/SearchResults/SearchResults.interface";
import { SearchResults } from "@components/Molecules/SearchResults/SearchResults";
import breakpoints from "@src/styles/global/overrides/_breakpoints.module.scss";

type PagefindModule = {
  init: () => Promise<void>;
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
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [allResults, setAllResults] = useState<SearchResultItemProps[]>([]);

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

  const handleFocus = async () => {
    setIsFocused(true);

    if (pagefind.current) return;

    // standard Pagefind implementation requires ts-ignore because pagefind.js does not
    // exist at build time (astro-pagefind creates the pagefind directory from the build output),
    // causing compilation errors for TS
    try {
      // @ts-ignore
      const pf = await import("/pagefind/pagefind.js");
      await pf.init();
      pagefind.current = pf;
    } catch (e) {
      console.error("Failed to initialise Pagefind", e);
    }
  };

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchInput(inputText);

    if (!pagefind.current) return;

    if (!inputText) {
      setAllResults([]);
      return;
    }

    try {
      const search = await pagefind.current.debouncedSearch(inputText);

      // pagefind drops debounced searches resolving them to null, so the following line closes these
      if (!search) return;

      // only the non-debounced search (within a 300ms window) will execute and resolve to results
      const loadedResults: PagefindResultsData[] = await Promise.all(
        search.results.map((r: any) => r.data()),
      );

      const finalResults: SearchResultItemProps[] = loadedResults.flatMap(
        (pagefindResults: PagefindResultsData) => {
          const tagObject = pagefindResults.meta?.tag
            ? { ...pagefindResults.meta.tag }
            : undefined;

          return pagefindResults.sub_results.map(
            (subResult: PagefindSubResult, index: number, subResults) => {
              const resultItem: SearchResultItemProps = {
                link: {
                  href: subResult.url,
                  label: subResult.title,
                },
                excerpt: subResult.excerpt,
                isLast: index === subResults.length - 1,
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

  return (
    <form
      role="search"
      className={clsx("text-dark", styles["input-bg"])}
      action="/search"
      method="GET"
    >
      <div ref={searchContainerRef} className={clsx("input-group", "mb-3")}>
        <input
          aria-describedby="search-button"
          aria-label={props.placeholder}
          className={clsx("form-control", styles["input-sizing"])}
          onChange={onChange}
          onFocus={handleFocus}
          placeholder={props.placeholder}
          type="search"
          name="params"
          value={searchInput}
        />
        {searchInput && isFocused && allResults.length > 0 && (
          <div className={clsx("mt-2", "w-100", styles["search-results"])}>
            <SearchResults searchResults={allResults} isMobile={isMobile} />
            <div
              className={clsx(
                "p-3",
                "bg-light",
                styles["sticky-link-container"],
              )}
            >
              <a
                href={`/search?params=${encodeURIComponent(searchInput)}`}
                className="btn btn-primary w-100"
              >
                View all results
              </a>
            </div>
          </div>
        )}

        <button
          className={clsx("btn", "btn-secondary")}
          type="submit"
          id="search-button"
        >
          <RiSearchLine />
        </button>
      </div>
    </form>
  );
};
