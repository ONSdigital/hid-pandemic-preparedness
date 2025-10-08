import type { ListItem } from "@localTypes/ListItem";
import type { TagData } from "@localTypes/TagData";
import type { QuestionBlock } from "@localTypes/QuestionBlock";

function createParentCheckbox(
  checkBoxList: ListItem[],
  tag: TagData,
  questionBlock: QuestionBlock,
) {
  const checkBoxListLength = checkBoxList.push({
    label: tag.title,
    id: tag.id,
    subItems: [],
  });
  addNestedCheckbox(checkBoxList, questionBlock, checkBoxListLength - 1);
}

function addNestedCheckbox(
  checkBoxList: ListItem[],
  questionBlock: QuestionBlock,
  index: number,
) {
  checkBoxList[index].subItems?.push({
    label: questionBlock.title,
    id: questionBlock.id,
  });
}

export function getCheckboxListItems(questionBlocks: QuestionBlock[]) {
  return questionBlocks.reduce((checkBoxList, questionBlock) => {
    questionBlock.tags.forEach((tag: TagData) => {
      const parentCheckboxIndex = checkBoxList.findIndex(
        (checkBox) => checkBox.id === tag.id,
      );
      if (parentCheckboxIndex === -1) {
        createParentCheckbox(checkBoxList, tag, questionBlock);
      } else {
        addNestedCheckbox(checkBoxList, questionBlock, parentCheckboxIndex);
      }
    });
    return checkBoxList;
  }, [] as ListItem[]);
}
