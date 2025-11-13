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
    <div className={clsx(styles["scrollable-table"])}>
      <div
        aria-hidden="true"
        className={clsx(styles["table-shadow"], styles["left"])}
        style={{ opacity: Number(showLeftShadow) }}
      />
      <div
        aria-hidden="true"
        className={clsx(styles["table-shadow"], styles["right"])}
        style={{ opacity: Number(showRightShadow) }}
      />
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
