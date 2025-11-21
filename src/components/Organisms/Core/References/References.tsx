import clsx from "clsx";
import type { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import type { ReferenceProps } from "@src/components/Molecules/Core/Reference/Reference.interface";

import { createReferenceId } from "@src/helpers/createReferenceId";

import type { ReferencesProps } from "./References.interface";
import styles from "./References.module.scss";

// Formatting a reference as per harvard reference style see https://libguides.ucd.ie/harvardstyle/harvardwebsite
const ReferenceItem: FC<ReferenceProps> = (props) => {
  return (
    <p id={createReferenceId(props)}>
      <small>
        {/* Set reference number to be a default value if `label` doesn't exist */}
        ({props.label ? props.label : "#REF!"}) {props.websiteAuthor} (
        {props.yearPublished}){" "}
        <span className="fst-italic">{props.websiteTitle}</span>. Available at:{" "}
        <a
          className={clsx("text-break", "link-light")}
          href={props.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.websiteUrl}
        </a>{" "}
        (Accessed {props.accessedDate}).
      </small>
    </p>
  );
};

export const References: FC<ReferencesProps> = (props) => {
  const accordionId: string = "references-accordion-id";
  const accordionItemId: string = uuidv4();

  return (
    <div className={clsx("w-100", styles["references-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div
          className={clsx(
            "accordion",
            "accordion-flush",
            "border-bottom",
            "border-light",
          )}
          id={accordionId}
          // Theme set to dark here to quickly make button icon visible against dark background.
          // May be better in future to override this to a custom colour.
          data-bs-theme="dark"
        >
          <div className={clsx("accordion-item", "border", "border-0")}>
            <h2 className={clsx("accordion-header")}>
              <button
                className={clsx(
                  "accordion-button",
                  "heading-s",
                  "text-light",
                  styles["button-bg"],
                )}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${accordionItemId}`}
                aria-expanded="true"
                aria-controls={accordionItemId}
              >
                References
              </button>
            </h2>
            <div
              id={accordionItemId}
              className={clsx("accordion-collapse", "collapse")}
              data-bs-parent={`#${accordionId}`}
            >
              <div className={clsx("accordion-body")}>
                {props.references && (
                  <div className={clsx("row", "row-cols-1", "row-cols-lg-2")}>
                    {props.references.map((refItem) => (
                      <div
                        className={clsx("col", "text-light")}
                        key={refItem._uid}
                      >
                        <ReferenceItem {...refItem} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
