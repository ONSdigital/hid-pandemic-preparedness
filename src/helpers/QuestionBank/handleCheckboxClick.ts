import type { SelectedCheckboxes } from "@localTypes/SelectedCheckboxes";

function uncheckParent(key: string, obj: SelectedCheckboxes) {
  const { [key]: removedKey, ...rest } = obj; // eslint-disable-line no-unused-vars
  return rest;
}

function checkParent(key: string, obj: SelectedCheckboxes) {
  return { ...obj, [key]: [] };
}

function uncheckChild(key: string, value: string, obj: SelectedCheckboxes) {
  return {
    ...obj,
    [key]: obj[key].filter((item) => item !== value),
  };
}

function checkChild(key: string, value: string, obj: SelectedCheckboxes) {
  return {
    ...obj,
    [key]: [...(obj[key] || []), value],
  };
}

export function handleCheckboxClick(
  prev: SelectedCheckboxes,
  id: string,
  parentId: string | undefined,
  checkedIds: SelectedCheckboxes,
) {
  const isChild = parentId;

  if (isChild) {
    const isChildChecked = Boolean(checkedIds[parentId]?.includes(id));
    return isChildChecked
      ? uncheckChild(parentId, id, prev)
      : checkChild(parentId, id, prev);
  } else {
    const isParentChecked = Boolean(checkedIds[id]);
    return isParentChecked ? uncheckParent(id, prev) : checkParent(id, prev);
  }
}
