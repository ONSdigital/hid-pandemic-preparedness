import clsx from "clsx";
import type { FC } from "react";

import { createReferenceId } from "@src/helpers/createReferenceId";

import type { ReferenceProps } from "./Reference.interface";
import styles from "./Reference.module.scss";
import { renderToStaticMarkup } from "react-dom/server";

// Formatting a reference as per harvard reference style see https://libguides.ucd.ie/harvardstyle/harvardwebsite
const Popover: FC<ReferenceProps> = (props) => {
  return (
    <p>
      <small>
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
  // Make the link href to include the label if it exists so we can use this to jump to the references
  // section at the foot of the page
  let url: string = "#";
  if (props.label) {
    url += createReferenceId(props);
  }

  return (
    <a
      role="reference-link"
      className={clsx(
        styles["ref-link"],
        "link-underline",
        "link-underline-opacity-0",
      )}
      href={url}
      data-bs-toggle="popover"
      data-bs-html="true"
      data-bs-content={renderToStaticMarkup(<Popover {...props} />)}
    >
      ({label})
    </a>
  );
};
