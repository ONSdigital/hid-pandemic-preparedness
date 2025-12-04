import clsx from "clsx";
import type { FC } from "react";

import { Icon } from "@components/Molecules/Core/Icon/Icon";

import type { IconButtonProps } from "./IconButton.interface";

export const IconButton: FC<IconButtonProps> = (props) => {
  const href = props.isDownloadable
    ? (props.downloadableContent?.filename ?? undefined)
    : props.link?.url;

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
      download={props.isDownloadable}
      target={props.isDownloadable ?  undefined : "_blank" }
    >
      {props.buttonText}
      {props.icon && <Icon iconName={props.icon} className={clsx("ms-2")} />}
    </a>
  );
};
