import clsx from "clsx";
import type { FC } from "react";

import { sanitizeUrl } from "@src/helpers/sanitizeUrl";

import { Icon } from "@components/Molecules/Core/Icon/Icon";
import type { IconButtonProps } from "./IconButton.interface";

export const IconButton: FC<IconButtonProps> = (props) => {
  let href = "";
  let isDownloadable = false;

  if (props.downloadableContent?.filename) {
    href = props.downloadableContent?.filename;
    isDownloadable = true;
  } else if (props.link?.url || props.link?.cached_url) {
    href = sanitizeUrl(props.link?.url || props.link?.cached_url);
  }

  const opensNewTab = Boolean(href) && !isDownloadable;

  return (
    <a
      href={href}
      className={clsx(
        "btn",
        "btn-primary",
        "d-inline-flex",
        "align-items-center",
        "gap-2",
      )}
      download={isDownloadable}
      target={opensNewTab ? "_blank" : undefined}
    >
      {props.buttonText}
      {props.icon && <Icon iconName={props.icon} className={clsx("ms-2")} />}
    </a>
  );
};
