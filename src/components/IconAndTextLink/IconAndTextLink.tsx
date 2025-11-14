import type { FC, ReactNode } from "react";
import clsx from "clsx";

import {
  RiDownload2Line,
  RiGithubLine,
  RiLightbulbLine,
  RiRestartLine,
  RiShareBoxLine,
} from "@remixicon/react";

import { sanitizeUrl } from "@src/helpers/sanitizeUrl";

import styles from "./IconAndTextLink.module.scss";
import type { IconAndTextLinkInterface } from "./IconAndTextLink.interface";

// Set size of icon here using icon component props
const ICON_SIZE: string = "1.5rem";

const linkIconMap: Record<string, ReactNode> = {
  github: <RiGithubLine size={ICON_SIZE} />,
  download: <RiDownload2Line size={ICON_SIZE} />,
  feedback: <RiLightbulbLine size={ICON_SIZE} />,
  restart: <RiRestartLine size={ICON_SIZE} />,
  share: <RiShareBoxLine size={ICON_SIZE} />,
};

export const IconAndTextLink: FC<IconAndTextLinkInterface> = (props) => {
  // Sanitize the url first just to make sure its in the correct format
  const sanitizedUrl = sanitizeUrl(props.href);

  return (
    <div className={clsx("d-flex", "align-items-center", "gap-2")}>
      {linkIconMap[props.icon]}
      <a
        className={clsx(styles["icon-and-text-link__label"])}
        href={sanitizedUrl}
        target={props.target}
        aria-disabled={props.disabled}
      >
        {props.label}
      </a>
    </div>
  );
};
