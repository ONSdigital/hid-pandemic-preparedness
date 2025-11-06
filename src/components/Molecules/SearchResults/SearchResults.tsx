import type { FC } from "react";
import clsx from "clsx";

import styles from "./SearchResults.module.scss";
import type {
  SearchResultItemProps,
  SearchResultsProps,
} from "./SearchResults.interface";
import { Tag } from "@/src/components/Molecules/Core/Tag/Tag";

const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  return (
    <div
      className={clsx(
        "d-flex",
        "flex-column",
        "gap-1",
        "pb-4",
        !props.isLast && "border-bottom",
      )}
    >
      <a
        className={clsx(styles["search-results-link"])}
        href={props.link.href}
        target={props.link.target}
        aria-disabled={props.link.disabled}
      >
        {props.link.label}
      </a>
      <p
        // subresults.excerpt is sanitised by Pagefind, ensuring it is safe to use
        dangerouslySetInnerHTML={{ __html: props.excerpt }} 
      /> 
      <div className="flex-start">
        <Tag {...props.tag} />
      </div>
    </div>
  );
};

export const SearchResults: FC<SearchResultsProps> = (props) => {
  return (
    <div
      className={clsx("w-100", "rounded", styles["search-results-bg"])}
    >
      <p className={clsx("fw-bold", styles["search-results-count"])}> {props.searchResults.length} search results</p>
      <div className={clsx("d-flex", "flex-column", "gap-4", "px-4")}>
        {props.searchResults.map((searchResult, index) => (
          <SearchResultItem
            key={index}
            {...searchResult}
            isLast={index === props.searchResults.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
