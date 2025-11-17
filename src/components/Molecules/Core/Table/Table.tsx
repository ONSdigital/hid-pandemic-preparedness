import clsx from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
import type { TableProps } from "./Table.interface";
import { TextModule } from "../TextModule/TextModule";
import styles from "./Table.module.scss";

export const Table: FC<TableProps> = (props) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const tableContent = props.table.content;

  // exit early if no content has been added to rich text editor
  if (!tableContent) return;

  const updateShadows = () => {
    const container = tableRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftShadow(scrollLeft > 0);
    setShowRightShadow(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const container = tableRef.current;
    if (!container) return;

    updateShadows();
    container.addEventListener("scroll", updateShadows);
    window.addEventListener("resize", updateShadows);

    return () => {
      container.removeEventListener("scroll", updateShadows);
      window.removeEventListener("resize", updateShadows);
    };
  }, []);

  return (
    <div
      className={clsx(
        styles["scrollable-table"],
        showLeftShadow && styles["can-scroll-left"],
        showRightShadow && styles["can-scroll-right"],
      )}
    >
      <div className={clsx(styles["table-wrapper"])} ref={tableRef}>
        <div
          className={clsx(styles["table-container"])}
          style={
            props.minWidth !== ""
              ? { minWidth: `${props.minWidth}px` }
              : undefined
          }
        >
          <TextModule richText={tableContent} />
        </div>
      </div>
    </div>
  );
};
