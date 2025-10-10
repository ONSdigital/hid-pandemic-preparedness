import type { ListItem } from "@localTypes/ListItem";
import type { SelectedCheckboxes } from "@localTypes/SelectedCheckboxes";

function getAllNestedCheckboxIds(
  parentCheckboxId: string,
  checkboxListItems: ListItem[],
) {
  const index = checkboxListItems.findIndex(
    (checkbox) => checkbox.id === parentCheckboxId,
  );
  const parentCheckbox = checkboxListItems[index];
  const allNestedCheckboxIds = parentCheckbox.subItems?.map(
    (nestedCheckbox) => nestedCheckbox.id,
  );
  return allNestedCheckboxIds || [];
}

export function getChildIdsFromState(
  checkedIds: SelectedCheckboxes,
  checkboxListItems: ListItem[],
) {
  let checkChildIds: string[] = [];

  for (let checkedParentId in checkedIds) {
    const checkedChildren = checkedIds[checkedParentId];
    const hasCheckedChildren = checkedChildren.length > 0;

    const childIds = hasCheckedChildren
      ? checkedChildren
      : getAllNestedCheckboxIds(checkedParentId, checkboxListItems);
    checkChildIds.push(...childIds);
  }
  return checkChildIds;
}
