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
        "pb-1",
        "pb-md-4",
        !props.isLast && "border-bottom",
      )}
    >
      <a
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
          {props.tag.map((tag) => (
            <Tag key={tag.id} {...tag} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export const SearchResults: FC<SearchResultsProps> = ({
  searchResults,
  isMobile,
  limit,
  totalResults,
  startingItemIndex = 0,
  searchInput = "",
}) => {
  const {
    search: { resultsCount },
  } = strings;

  if (searchResults === null) {
    return (
      <div
        className={clsx(
          "w-100",
          "d-flex",
          "flex-column",
          "align-items-center",
          "justify-content-center",
          "text-center",
          "py-5",
          styles["search-results-bg"],
        )}
      >
        <p className="text-secondary mb-0">Searching...</p>
      </div>
    );
  }

  const resultsToDisplay = limit
    ? searchResults.slice(0, limit)
    : searchResults;

  const countToDisplay = totalResults ?? searchResults.length;

  const hasSearchTerm = searchInput && searchInput.trim().length > 0;
  const hasResults = resultsToDisplay.length > 0;

  // Search found nothing
  if (hasSearchTerm && !hasResults) {
    return (
      <div
        className={clsx(
          "w-100",
          "d-flex",
          "flex-column",
          "align-items-center",
          "justify-content-center",
          "text-center",
          "py-5",
          styles["search-results-bg"],
        )}
      >
        <h3 className="h5 fw-bold text-dark mb-2">No results found</h3>

        <p className="text-secondary mb-0" style={{ maxWidth: "400px" }}>
          We couldn't find any matches for <br />
          <span className="fw-semibold text-dark">"{searchInput}"</span>.
        </p>
      </div>
    );
  }

  // No search term entered
  if (!hasResults) {
    return null;
  }

  // search found results
  const startCount = startingItemIndex + 1;
  const endCount = startingItemIndex + resultsToDisplay.length;

  const resultsText = resultsCount
    .replace("{start}", startCount.toString())
    .replace("{end}", endCount.toString())
    .replace("{total}", countToDisplay.toString());

  return (
    <div className={clsx("w-100", styles["search-results-bg"])}>
      <p className={clsx("fw-bold", styles["search-results-count"])}>
        {resultsText}
      </p>
      <div
        className={clsx("d-flex", "flex-column", "gap-2", "gap-md-4", "px-4")}
      >
        {resultsToDisplay.map((searchResult, index) => (
          <SearchResultItem
            key={index}
            {...searchResult}
            isLast={index === resultsToDisplay.length - 1}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};
