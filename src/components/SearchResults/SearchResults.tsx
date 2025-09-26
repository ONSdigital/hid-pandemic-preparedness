import type { FC } from "react";
import clsx from "clsx";

import styles from "./SearchResults.module.scss";
import type {
  SearchResultItemProps,
  SearchResultsProps,
} from "./SearchResults.interface";
import { Tag } from "../Tag/Tag";

const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  return (
    <div className={clsx("d-flex", "flex-column", "gap-1")}>
      <a
        className={clsx(styles["search-results-link"])}
        href={props.link.href}
        target={props.link.target}
        aria-disabled={props.link.disabled}
      >
        {props.link.label}
      </a>
      <p> {props.contextLabel}</p>
      <div className="flex-start">
        <Tag {...props.tag} />
      </div>
    </div>
  );
};

export const SearchResults: FC<SearchResultsProps> = (props) => {
  return (
    <div className={clsx("w-100", "rounded", styles["search-results-bg"])}>
      <div className={clsx("d-flex", "flex-column", "gap-4", "p-5")}>
        {props.searchResults.map((searchResult, index) => (
          <SearchResultItem key={index} {...searchResult} />
        ))}
      </div>
    </div>
  );
};
