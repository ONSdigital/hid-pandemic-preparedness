import clsx from "clsx";
import type { FC } from "react";

import styles from "./FilterMenu.module.scss";
import type { FilterMenuProps } from "./FilterMenu.interface";
import { ListGroupChecks } from "../../ListGroup/ListGroup";
import { QuestionBlock } from "../QuestionBlock/QuestionBlock";

// Renders input `htmlContent` using the `TextModule` component
export const FilterMenu: FC<FilterMenuProps> = (props) => {
  return (
    <div>
      <ListGroupChecks {...props.listGroupChecksProps} />
      <QuestionBlock {...props.questionBlockProps} />
    </div>
  );
};
