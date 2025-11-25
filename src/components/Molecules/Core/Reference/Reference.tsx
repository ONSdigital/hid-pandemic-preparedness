import clsx from "clsx";
import type { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { createReferenceId } from "@src/helpers/createReferenceId";

import type { ReferenceProps } from "./Reference.interface";

// Formatting a reference as per harvard reference style see https://libguides.ucd.ie/harvardstyle/harvardwebsite
// If popover we want to be able to link to the item at the foot of the page, otherwise render
// as the item at the foot of the page
export const ReferenceItem: FC<ReferenceProps> = (props) => {
  let label: string = "#REF!";
  let renderAsPopover: boolean = false;
  // Make the link href to include the label if it exists so we can use this to jump to the references
  // section at the foot of the page
  let referenceId: string = createReferenceId(props);

  if (props.label) {
    label = props.label;
  }

  if (props.renderAsPopover) {
    renderAsPopover = true;
  }

  return (
    <p id={renderAsPopover ? undefined : referenceId}>
      <small>
        {renderAsPopover ? (
          <a
            className={clsx("link-underline", "link-underline-opacity-0")}
            href={`#${referenceId}`}
          >
            ({label})
          </a>
        ) : (
          `(${label})`
        )}{" "}
        {props.websiteAuthor} ({props.yearPublished}){" "}
        <span className="fst-italic">{props.websiteTitle}</span>. Available at:{" "}
        <a
          className={clsx(
            "text-break",
            renderAsPopover === false && "link-light",
          )}
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
      className={clsx("link-underline", "link-underline-opacity-0")}
      href={"#!"}
      data-bs-toggle="popover"
      data-bs-placement="top"
      data-bs-html="true"
      data-bs-content={renderToStaticMarkup(
        <ReferenceItem {...props} renderAsPopover />,
      )}
    >
      ({label})
    </a>
  );
};
