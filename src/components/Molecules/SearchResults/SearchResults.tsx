import type { FC } from "react";
import clsx from "clsx";
import styles from "./SearchResults.module.scss";
import type {
  SearchResultItemProps,
  SearchResultsProps,
} from "./SearchResults.interface";
import { Tag } from "@/src/components/Molecules/Core/Tag/Tag";
import strings from "@src/content/strings.json";

const SearchResultItem: FC<SearchResultItemProps> = (props) => {
  return (
    <div
      className={clsx(
        "d-flex",
        "flex-column",
        "gap-1",
        "pb-1", "pb-md-4",
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
        className={clsx(props.isMobile && styles["truncate-excerpt"])}
        // subresults.excerpt is sanitised by Pagefind, ensuring it is safe to use
        dangerouslySetInnerHTML={{ __html: props.excerpt }}
      />
      {props.tag?.length ? (
        <div className="flex-start">
          <Tag {...props.tag} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export const SearchResults: FC<SearchResultsProps> = (props) => {
  const {
    search: { numSearchResults },
  } = strings;

  const resultsToDisplay = props.limit
    ? props.searchResults.slice(0, props.limit)
    : props.searchResults;

  return (
   <div className={clsx("w-100", styles["search-results-bg"])}>
      <p className={clsx("fw-bold", styles["search-results-count"])}>
        Showing {resultsToDisplay.length} of {props.searchResults.length} {numSearchResults}
      </p>
      <div className={clsx("d-flex", "flex-column", "gap-2", "gap-md-4", "px-4")}>
        {resultsToDisplay.map((searchResult, index) => (
          <SearchResultItem
            key={index}
            {...searchResult}
            isLast={index === resultsToDisplay.length - 1}
            isMobile={props.isMobile}
          />
        ))}
      </div>
    </div>
  );
};
