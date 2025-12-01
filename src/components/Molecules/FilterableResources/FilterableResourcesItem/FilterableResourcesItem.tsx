import clsx from "clsx";
import type { FC } from "react";
import { useRef } from "react";

import { CopyButton } from "@src/components/Molecules/Core/CopyButton/CopyButton";
import { TextModule } from "@src/components/Molecules/Core/TextModule/TextModule";

import type { FilterableResourcesItemProps } from "./FilterableResourcesItem.interface";
import styles from "./FilterableResourcesItem.module.scss";

export const FilterableResourcesItem: FC<FilterableResourcesItemProps> = (
  props,
) => {
  const contentElement = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx("position-relative")}>
      <div
        ref={contentElement}
        className={clsx(
          "rounded",
          "py-3",
          "ps-4",
          styles["item-bg"],
          styles["copy-btn-space"],
        )}
      >
        {props.content && <TextModule richText={props.content} />}
      </div>
      <CopyButton
        contentElement={contentElement}
        className={clsx("position-absolute", "top-0", "end-0", "mt-2")}
      />
    </div>
  );
};
