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
}) => {
  const {
    search: { resultsCount },
  } = strings;

  const resultsToDisplay = limit
    ? searchResults.slice(0, limit)
    : searchResults;

  const countToDisplay = totalResults ?? searchResults.length;

  // find results range
  const startCount = resultsToDisplay.length > 0 ? startingItemIndex + 1 : 0;
  const endCount =
    resultsToDisplay.length > 0
      ? startingItemIndex + resultsToDisplay.length
      : 0;

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
