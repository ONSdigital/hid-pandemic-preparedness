import { useState, type FC } from "react";
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
      [key]: [...(obj[key] || []), value],
    };
  }

  function onCheckboxClick(id: string, parentId: string | undefined) {
    const isChild = parentId;

    if (isChild) {
      const parentIncludesChildId = Boolean(
        selectedIds[parentId]?.includes(id),
      );
      if (parentIncludesChildId) {
        setSelectedIds((prev) => removeChild(parentId, id, prev));
      } else {
        setSelectedIds((prev) => addChild(parentId, id, prev));
      }
    } else {
      const inSelectedList = Boolean(selectedIds[id]);
      if (inSelectedList) {
        setSelectedIds((prev) => removeParent(id, prev));
      } else {
        setSelectedIds((prev) => addParent(id, prev));
      }
    }

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

  function getChildIdsFromState() {
    let childIds: string[] = [];
    for (let item in selectedIds) {
      if (selectedIds[item].length > 0) {
        childIds = [...childIds, ...selectedIds[item]];
      } else {
        const index = props.filterCheckboxList.listItems.findIndex(
          (el) => el.id === item,
        );
        if (index === -1) {
          return [];
        }
        const questionBlock = props.filterCheckboxList.listItems[index];
        if (!questionBlock.subItems) {
          return [];
        }
        const childrenOfQuestionBlock = questionBlock.subItems?.map(
          (item) => item.id,
        );
        childIds = [...childIds, ...(childrenOfQuestionBlock || [])];
      }
    }
    return childIds;
  }

  const childIds = getChildIdsFromState();
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
              // selectedIds={selectedIds}
              onChange={onCheckboxClick}
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
