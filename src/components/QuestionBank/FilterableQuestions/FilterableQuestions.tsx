import { useState, type ChangeEvent, type FC } from "react";
import clsx from "clsx";

import { ListGroupChecks } from "@components/ListGroup/ListGroup";
import type { FilterableQuestionsProps } from "@components/QuestionBank/FilterableQuestions/FilterableQuestions.interface";
import { QuestionBlock } from "@components/QuestionBank/QuestionBlock/QuestionBlock";

import styles from "./FilterableQuestions.module.scss";

interface selectedType {
  [key: string]: string[];
}

export const FilterableQuestions: FC<FilterableQuestionsProps> = (props) => {
  const [selectedIds, setSelectedIds] = useState<selectedType>({});

  function removeParent(key: string, obj: selectedType) {
    const { [key]: removedKey, ...rest } = obj;
    return rest;
  }

  function addParent(key: string, obj: selectedType) {
    return { ...obj, [key]: [] };
  }

  function removeChild(key: string, value: string, obj: selectedType) {
    return {
      ...obj,
      [key]: obj[key].filter((item) => item !== value),
    };
  }

  function addChild(key: string, value: string, obj: selectedType) {
    return {
      ...obj,
      [key]: [...(obj[key] || []), value], // TODO add comment
    };
  }

  function checkBoxChecker(id: string, parentId: string | undefined) {
    if (!parentId) {
      // Is a parent
      if (selectedIds[id]) {
        setSelectedIds((prev) => removeParent(id, prev));
      } else {
        setSelectedIds((prev) => addParent(id, prev));
      }
    } else {
      // Is a child
      if (selectedIds[parentId]?.includes(id)) {
        setSelectedIds((prev) => removeChild(parentId, id, prev));
      } else {
        setSelectedIds((prev) => addChild(parentId, id, prev));
      }
    }
    console.log(selectedIds);

    // setSelectedIds((currentSelection) => {
    //   if (checked) {
    //     if (currentSelection.includes(id)) {
    //       return currentSelection;
    //     }
    //     return [...currentSelection, id];
    //   } else {
    //     return currentSelection.filter((selectedId) => selectedId !== id);
    //   }
    // });
  }

  // const hasSelectedIds = selectedIds.length > 0;

  // const filteredQuestionBlocks = hasSelectedIds
  //   ? props.questionBlocks.filter((block) =>
  //       block.tags.some((tag) => selectedIds.includes(tag.id)),
  //     )
  //   : props.questionBlocks;

  return (
    <div className={clsx("w-100", styles["filter-menu-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3", "mb-3")}>
            <ListGroupChecks
              {...props.filterCheckboxList}
              // selectedIds={selectedIds}
              onChange={checkBoxChecker}
            />
          </div>
          {/* <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            {filteredQuestionBlocks.map((questionBlock, index) => {
              return <QuestionBlock key={index} {...questionBlock} />;
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};
