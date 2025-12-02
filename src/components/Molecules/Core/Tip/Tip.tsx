import clsx from "clsx";
import type { FC } from "react";

import { Icon } from "@src/components/Molecules/Core/Icon/Icon";

import strings from "@src/content/strings.json";

import type { TipProps } from "./Tip.interface";
import styles from "./Tip.module.scss";

export const Tip: FC<TipProps> = (props) => {
  const tipStrings = strings.core.tip;

  return (
    <div
      className={clsx(
        "d-flex",
        "flex-row",
        "px-4",
        "py-3",
        "mb-4",
        "gap-2",
        styles["tip-container"],
      )}
    >
      <div className={clsx("d-flex", "align-items-center")}>
        <Icon iconName="RiInformationLine" />
      </div>
      <div>
        <strong>{`${tipStrings.tip}: `}</strong>
        {props.text}
      </div>
    </div>
  );
};
