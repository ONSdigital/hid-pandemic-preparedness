import type {
  BlockAttributes,
  StoryblokRichTextNode,
  StoryblokRichTextNodeResolver,
} from "@storyblok/richtext";

// Copied from https://github.com/storyblok/monoblok/packages/richtext/src/types/index.ts as these are not exported
enum BlockTypes {
  // DOCUMENT = "doc",
  HEADING = "heading",
  // PARAGRAPH = "paragraph",
  // QUOTE = "blockquote",
  // OL_LIST = "ordered_list",
  // UL_LIST = "bullet_list",
  // LIST_ITEM = "list_item",
  // CODE_BLOCK = "code_block",
  // HR = "horizontal_rule",
  // BR = "hard_break",
  // IMAGE = "image",
  // EMOJI = "emoji",
  // COMPONENT = "blok",
  // TABLE = "table",
  // TABLE_ROW = "tableRow",
  // TABLE_CELL = "tableCell",
  // TABLE_HEADER = "tableHeader",
}

// enum MarkTypes {
//   BOLD = "bold",
//   STRONG = "strong",
//   STRIKE = "strike",
//   UNDERLINE = "underline",
//   ITALIC = "italic",
//   CODE = "code",
//   LINK = "link",
//   ANCHOR = "anchor",
//   STYLED = "styled",
//   SUPERSCRIPT = "superscript",
//   SUBSCRIPT = "subscript",
//   TEXT_STYLE = "textStyle",
//   HIGHLIGHT = "highlight",
// }

// enum TextTypes {
//   TEXT = "text",
// }

// Removes undefined values from an object.
// Copied from https://github.com/storyblok/monoblok/packages/richtext/src/utils/index.ts as this function is not exported
export const cleanObject = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined), // eslint-disable-line no-unused-vars
  );
};

// Processes attributes and styles for a node
// Copied from https://github.com/storyblok/monoblok/packages/richtext/src/richtext.ts as this function is not exported
const processAttributes = (attrs: BlockAttributes = {}): BlockAttributes => {
  const {
    textAlign,
    class: className,
    id: idName,
    style: existingStyle,
    ...rest
  } = attrs;
  const styles: string[] = [];

  // Add existing styles if any
  if (existingStyle) {
    styles.push(
      existingStyle.endsWith(";") ? existingStyle : `${existingStyle};`,
    );
  }

  // Add text alignment if specified
  if (textAlign) {
    styles.push(`text-align: ${textAlign};`);
  }

  return cleanObject({
    ...rest,
    class: className,
    id: idName,
    ...(styles.length > 0 ? { style: styles.join(" ") } : {}),
  });
};

// Custom heading resolver that adds our custom styling based on heading level
export const headingResolver: StoryblokRichTextNodeResolver<T> = (
  node: StoryblokRichTextNode<T>,
  context,
): T => {
  console.log(node);
  const headingStylingMap: Record<number, string> = {
    1: "heading-xl",
    2: "heading-l",
    3: "heading-m",
    4: "heading-s",
    5: "heading-xs",
  };

  const { level, ...rest } = node.attrs || {};

  let headingElement = `h${level}`;

  const levelStyle = headingStylingMap[level];
  // Add styling class if available
  if (levelStyle) {
    headingElement = `${headingElement} class=${levelStyle}`;
  }

  const attributes = processAttributes(rest);
  return context.render(headingElement, attributes, node.children) as T;
};

// Create some overrides for our resolvers so we can add custom styles
export const overiddenResolvers: Record<
  string,
  StoryblokRichTextNodeResolver<T>
> = {
  // [BlockTypes.DOCUMENT, nodeResolver("")],
  [BlockTypes.HEADING]: headingResolver,
  // [BlockTypes.PARAGRAPH, nodeResolver("p")],
  // [BlockTypes.UL_LIST, nodeResolver("ul")],
  // [BlockTypes.OL_LIST, nodeResolver("ol")],
  // [BlockTypes.LIST_ITEM, nodeResolver("li")],
  // [BlockTypes.IMAGE, imageResolver],
  // [BlockTypes.EMOJI, emojiResolver],
  // [BlockTypes.CODE_BLOCK, codeBlockResolver],
  // [BlockTypes.HR, nodeResolver("hr")],
  // [BlockTypes.BR, nodeResolver("br")],
  // [BlockTypes.QUOTE, nodeResolver("blockquote")],
  // [BlockTypes.COMPONENT, componentResolver],
  // [TextTypes.TEXT, textResolver],
  // [MarkTypes.LINK, linkResolver],
  // [MarkTypes.ANCHOR, linkResolver],
  // [MarkTypes.STYLED, markResolver("span", true)],
  // [MarkTypes.BOLD, markResolver("strong")],
  // [MarkTypes.TEXT_STYLE, markResolver("span", true)],
  // [MarkTypes.ITALIC, markResolver("em")],
  // [MarkTypes.UNDERLINE, markResolver("u")],
  // [MarkTypes.STRIKE, markResolver("s")],
  // [MarkTypes.CODE, markResolver("code")],
  // [MarkTypes.SUPERSCRIPT, markResolver("sup")],
  // [MarkTypes.SUBSCRIPT, markResolver("sub")],
  // [MarkTypes.HIGHLIGHT, markResolver("mark")],
  // [BlockTypes.TABLE, tableResolver],
  // [BlockTypes.TABLE_ROW, tableRowResolver],
  // [BlockTypes.TABLE_CELL, tableCellResolver],
  // [BlockTypes.TABLE_HEADER, tableHeaderResolver],
};
