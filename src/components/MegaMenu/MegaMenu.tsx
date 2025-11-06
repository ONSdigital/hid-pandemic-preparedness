import clsx from "clsx";
import type { FC } from "react";

import { TextModule } from "@components/Molecules/Core/TextModule/TextModule";
import { ListGroupLinks } from "@components/ListGroup/ListGroup";

import type { MegaMenuProps } from "./MegaMenu.interface";
import styles from "./MegaMenu.module.scss";

export const MegaMenu: FC<MegaMenuProps> = (props) => {
  return (
    <div className={clsx(styles["mega-menu"], "w-100", "py-4")}>
      <div className={clsx("container-lg")}>
        {props.overview && <TextModule richText={props.overview} />}
        <div className={clsx("row", "row-cols-1", "row-cols-lg-5")}>
          {props.columns.map((column) => (
            <div className={clsx("col", "py-2")} key={column._uid}>
              <ListGroupLinks {...column} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
