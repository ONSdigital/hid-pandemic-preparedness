import clsx from "clsx";
import { useState, useRef, type ChangeEvent, type FC, useEffect } from "react";
import { RiSearchLine } from "@remixicon/react";

import type { SearchBarProps } from "./SearchBar.interface";
import styles from "./SearchBar.module.scss";
// import SearchResultsData from "@content/searchResults.json";
// import { SearchResults } from "@components/Molecules/SearchResults/SearchResults";
// import type { SearchResultItemProps } from "@components/Molecules/SearchResults/SearchResults.interface";

// const SearchResultsProps = SearchResultsData as SearchResultItemProps[];

export const SearchBar: FC<SearchBarProps> = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const searchContainerRef = useRef<HTMLDivElement | null>(null);

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
    try {
      // @ts-ignore
      const pagefind = await import("/pagefind/pagefind.js")
      pagefind.init();
    } catch (e) {
      console.error("Failed to initialise Pagefind", e);
    }
  }

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchInput(inputText);

    if (!inputText) {
      setResults([]);
      return;
    }

    try {
      // @ts-ignore
      const pagefind = await import("/pagefind/pagefind.js");
      const search = await pagefind.debouncedSearch(inputText);

      if (!search) {
        return;
      }

      const loadedResults = await Promise.all(
        search.results.map((r: any) => r.data()),
      );

      setResults(loadedResults);
    } catch (e) {
      console.error("Pagefind search failed:", e);
    }    
  };

  searchInput && isFocused && results.length > 0 && console.log(JSON.stringify(results))

  return (
    <form role="search" className={clsx("text-dark", styles["input-bg"])}>
      <div ref={searchContainerRef} className={clsx("input-group", "mb-3")}>
        <input
          aria-describedby="search-button"
          aria-label={props.placeholder}
          className={clsx("form-control", styles["input-sizing"])}
          onChange={onChange}
          onFocus={handleFocus}
          placeholder={props.placeholder}
          type="search"
        />
        {searchInput && isFocused && results.length > 0 && (
          <div className={clsx("mt-2", "w-100", styles["search-results"])}>
            {JSON.stringify(results)}
          </div>
        )}

        <button
          className={clsx("btn", "btn-secondary")}
          type="button"
          id="search-button"
        >
          <RiSearchLine />
        </button>
      </div>
    </form>
  );
};
