import { useState, type ChangeEvent, type FC } from "react";
import clsx from "clsx";

import { ListGroupChecks } from "@components/ListGroup/ListGroup";
import type { FilterableQuestionsProps } from "@components/QuestionBank/FilterableQuestions/FilterableQuestions.interface";
import { QuestionBlock } from "@/src/components/Organisms/FilterableResources/QuestionBlock/QuestionBlock";

import styles from "./FilterableQuestions.module.scss";

export const FilterableQuestions: FC<FilterableQuestionsProps> = (props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setSelectedIds((currentSelection) => {
      if (checked) {
        if (currentSelection.includes(id)) {
          return currentSelection;
        }
        return [...currentSelection, id];
      } else {
        return currentSelection.filter((selectedId) => selectedId !== id);
      }
    });
  };

  const hasSelectedIds = selectedIds.length > 0;

  const filteredQuestionBlocks = hasSelectedIds
    ? props.questionBlocks.filter((block) =>
        block.tags.some((tag) => selectedIds.includes(tag.id)),
      )
    : props.questionBlocks;

  return (
    <div className={clsx("w-100", styles["filter-menu-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3", "mb-3")}>
            <ListGroupChecks
              {...props.filterMenu}
              selectedIds={selectedIds}
              onChange={onCheckboxChange}
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
