import clsx from "clsx";
import type { FC } from "react";

import type { ReferenceProps } from "./Reference.interface";
import { Tooltip } from "../Tooltip/Tooltip";

// Formatting a reference as per harvard reference style see https://libguides.ucd.ie/harvardstyle/harvardwebsite
const ReferenceItem: FC<ReferenceProps> = (props) => {
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
  return <Tooltip triggerText="!REF" content={<ReferenceItem {...props} />} />;
};
