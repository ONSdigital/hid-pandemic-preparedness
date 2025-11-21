import clsx from "clsx";
import type { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { createReferenceId } from "@src/helpers/createReferenceId";

import type { ReferenceProps } from "./Reference.interface";
import styles from "./Reference.module.scss";

// Formatting a reference as per harvard reference style see https://libguides.ucd.ie/harvardstyle/harvardwebsite
const ReferencePopover: FC<ReferenceProps> = (props) => {
  // Make the link href to include the label if it exists so we can use this to jump to the references
  // section at the foot of the page
  let url: string = "#";
  if (props.label) {
    url += createReferenceId(props);
  }

  return (
    <p>
      <small>
        {props.label && (
          <a
            className={clsx(
              styles["ref-link"],
              "link-underline",
              "link-underline-opacity-0",
            )}
            href={url}
          >
            ({props.label})
          </a>
        )}{" "}
        {props.websiteAuthor} ({props.yearPublished}){" "}
        <span className="fst-italic">{props.websiteTitle}</span>. Available at:{" "}
        <a
          className={clsx("text-break")}
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

export const Reference: FC<ReferenceProps> = (props) => {
  // Set label to a placeholder if its not provided
  const label: string = props.label ? props.label : "REF!";

  return (
    <a
      role="reference-link"
      className={clsx(
        styles["ref-link"],
        "link-underline",
        "link-underline-opacity-0",
      )}
      href={"#!"}
      data-bs-toggle="popover"
      data-bs-placement="top"
      data-bs-html="true"
      data-bs-content={renderToStaticMarkup(<ReferencePopover {...props} />)}
    >
      ({label})
    </a>
  );
};
