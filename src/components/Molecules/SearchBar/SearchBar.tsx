import clsx from "clsx";
import { useState, useRef, type ChangeEvent, type FC } from "react";
import { RiSearchLine } from "@remixicon/react";

import { useClickOutside } from "@src/hooks/useClickOutside";

import styles from "./SearchBar.module.scss";
import type { SearchBarProps } from "./SearchBar.interface";

import SearchResultsData from "@content/searchResults.json";
import { SearchResults } from "@components/Molecules/SearchResults/SearchResults";
import type { SearchResultItemProps } from "@components/Molecules/SearchResults/SearchResults.interface";

const SearchResultsProps = SearchResultsData as SearchResultItemProps[];

export const SearchBar: FC<SearchBarProps> = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(searchContainerRef, () => setIsFocused(false));

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchInput(inputText);
  };

  return (
    <form role="search" className={clsx("text-dark", styles["input-bg"])}>
      <div ref={searchContainerRef} className={clsx("input-group", "mb-3")}>
        <input
          aria-describedby="search-button"
          aria-label={props.placeholder}
          className={clsx("form-control", styles["input-sizing"])}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          placeholder={props.placeholder}
          type="search"
        />
        {searchInput && isFocused && (
          <div className={clsx("mt-2", "w-100", styles["search-results"])}>
            <SearchResults searchResults={SearchResultsProps} />
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
