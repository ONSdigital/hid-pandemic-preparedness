import { useState, type FC } from "react";
import clsx from "clsx";

import type { SelectedCheckboxes } from "@localTypes/SelectedCheckboxes";

import { getChildIdsFromState } from "@helpers/QuestionBank/getChildIdsFromState";
import { handleCheckboxClick } from "@helpers/QuestionBank/handleCheckboxClick";
import { ListGroupChecks } from "@components/ListGroup/ListGroup";
import type { FilterableQuestionsProps } from "@components/QuestionBank/FilterableQuestions/FilterableQuestions.interface";
import { QuestionBlock } from "@components/QuestionBank/QuestionBlock/QuestionBlock";

import styles from "./FilterableQuestions.module.scss";

export const FilterableQuestions: FC<FilterableQuestionsProps> = (props) => {
  const [checkedIds, setCheckedIds] = useState<SelectedCheckboxes>({});

  const childIds = getChildIdsFromState(
    checkedIds,
    props.filterCheckboxList.listItems,
  );
  const hasSelectedIds = childIds.length > 0;

  const filteredQuestionBlocks = hasSelectedIds
    ? props.questionBlocks.filter((block) => childIds.includes(block.id))
    : props.questionBlocks;

  return (
    <div className={clsx("w-100", styles["filter-menu-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3", "mb-3")}>
            <ListGroupChecks
              {...props.filterCheckboxList}
              checkedIds={checkedIds}
              onChange={(id, parentId) =>
                setCheckedIds((prev) =>
                  handleCheckboxClick(prev, id, parentId, checkedIds),
                )
              }
            />
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            {filteredQuestionBlocks.map((questionBlock, index) => {
              return <QuestionBlock key={index} {...questionBlock} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
