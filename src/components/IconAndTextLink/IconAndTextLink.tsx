import type { FC, ReactNode } from "react";
import clsx from "clsx";

import {
  RiDownload2Line,
  RiGithubLine,
  RiLightbulbLine,
  RiShareBoxLine,
} from "@remixicon/react";

import styles from "./IconAndTextLink.module.scss";
import type { IconAndTextLinkInterface } from "./IconAndTextLink.interface";

const linkIconMap: Record<string, ReactNode> = {
  github: <RiGithubLine className={styles["icon-and-text-link__icon-size"]} />,
  pdf: <RiDownload2Line className={styles["icon-and-text-link__icon-size"]} />,
  feedback: (
    <RiLightbulbLine className={styles["icon-and-text-link__icon-size"]} />
  ),
  share: <RiShareBoxLine className={styles["icon-and-text-link__icon-size"]} />,
};

export const IconAndTextLink: FC<IconAndTextLinkInterface> = (props) => {
  return (
    <div className={clsx("d-flex", "align-items-center", "gap-1")}>
      {linkIconMap[props.icon]}
      <a
        className={clsx("body-small", styles["icon-and-text-link__label"])}
        href={props.href}
        target={props.target}
        aria-disabled={props.disabled}
      >
        {props.label}
      </a>
    </div>
  );
};
