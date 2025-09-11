import clsx from "clsx";
import type { FC } from "react";

import { ListGroupLinks } from "../ListGroup/ListGroup";
import type { MegaMenuProps } from "./MegaMenu.interface";
import styles from "./MegaMenu.module.scss";

// React component for the footer
export const MegaMenu: FC<MegaMenuProps> = (props) => {
  return (
    <div className={clsx(styles["mega-menu"], "w-100", "py-4")}>
      <div className={clsx("container")}>
        <div className={clsx("row", "row-cols-1", "row-cols-lg-5")}>
          {props.navItems.map((navItem) => (
            <div className={clsx("col")} key={navItem.id}>
              <ListGroupLinks title={navItem.label} {...navItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
