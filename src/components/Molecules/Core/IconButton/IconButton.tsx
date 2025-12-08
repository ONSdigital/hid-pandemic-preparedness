import clsx from "clsx";
import type { FC } from "react";

import { Icon } from "@components/Molecules/Core/Icon/Icon";

import type { IconButtonProps } from "./IconButton.interface";

export const IconButton: FC<IconButtonProps> = (props) => {
  const href =  props.link?.url || props.downloadableContent?.filename || "";
  const isDownloadable = Boolean(props.downloadableContent?.filename);

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
      target={isDownloadable ? undefined : "_blank"}
    >
      {props.buttonText}
      {props.icon && <Icon iconName={props.icon} className={clsx("ms-2")} />}
    </a>
  );
};
