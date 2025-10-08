interface checkedType {
  [key: string]: string[];
} // TODO

function uncheckParent(key: string, obj: checkedType) {
  const { [key]: removedKey, ...rest } = obj;
  return rest;
}

function checkParent(key: string, obj: checkedType) {
  return { ...obj, [key]: [] };
}

function uncheckChild(key: string, value: string, obj: checkedType) {
  return {
    ...obj,
    [key]: obj[key].filter((item) => item !== value),
  };
}

function checkChild(key: string, value: string, obj: checkedType) {
  return {
    ...obj,
    [key]: [...(obj[key] || []), value],
  };
}

export function handleCheckboxClick(
  prev: checkedType,
  id: string,
  parentId: string | undefined,
  checkedIds: checkedType,
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
