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
import type { IconAndTextLinkProps } from "./IconAndTextLink.interface";

// Set size of icon here using icon component props
const ICON_SIZE: string = "1.5rem";

const linkIconMap: Record<string, ReactNode> = {
  github: <RiGithubLine size={ICON_SIZE} />,
  download: <RiDownload2Line size={ICON_SIZE} />,
  feedback: <RiLightbulbLine size={ICON_SIZE} />,
  restart: <RiRestartLine size={ICON_SIZE} />,
  share: <RiShareBoxLine size={ICON_SIZE} />,
};

export const IconAndTextLink: FC<IconAndTextLinkProps> = (props) => {
  // Set a default to make href isn't empty
  let download: boolean = false;
  let linkUrl: string = "#";
  let target: string = "_self";

  // If supplied with an asset, set the link href to be the filename and add download attribute
  if (props.asset?.filename) {
    download = true;
    linkUrl = props.asset.filename;
    target = "_blank";
  } else {
    // If supplied with a link, set the link href to be either `url` or `cached_url`
    if (props.link) {
      // Try to sanitize
      linkUrl = sanitizeUrl(
        props.link.url ? props.link.url : props.link.cached_url,
      );
      // Only update target if its valid
      if (props.link.target) {
        target = props.link.target;
      }
    }
  }

  return (
    <div className={clsx("d-flex", "align-items-center", "gap-2")}>
      {linkIconMap[props.icon]}
      <a
        className={clsx(styles["label"])}
        href={linkUrl}
        target={target}
        aria-disabled={props.disabled}
        download={download}
        onClick={props.onClick}
      >
        {props.label}
      </a>
    </div>
  );
};
