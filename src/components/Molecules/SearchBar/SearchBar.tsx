import clsx from "clsx";
import { useState, type ChangeEvent, type FC } from "react";
import { RiSearchLine } from "@remixicon/react";

import type { SearchBarProps } from "./SearchBar.interface";
import styles from "./SearchBar.module.scss";
import { SearchResults } from "../../SearchResults/SearchResults";
import SearchResultsData from "@content/searchResults.json";
import type { SearchResultItemProps } from "../../SearchResults/SearchResults.interface";

const SearchResultsProps = SearchResultsData as SearchResultItemProps[];

export const SearchBar: FC<SearchBarProps> = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchInput(inputText);
  };

  return (
    <form role="search" className={clsx("text-dark", styles["input-bg"])}>
      <div className={clsx("input-group", "mb-3")}>
        <input
          aria-describedby="search-button"
          aria-label={props.placeholder}
          className={clsx("form-control", styles["input-sizing"])}
          onChange={onChange}
          placeholder={props.placeholder}
          type="search"
        />
        {searchInput && (
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
