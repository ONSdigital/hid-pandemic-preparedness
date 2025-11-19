// Ignoring instances where generic `T` is undefined
/* eslint-disable no-undef */

import type {
  BlockAttributes,
  StoryblokRichTextNode,
  StoryblokRichTextNodeResolver,
} from "@storyblok/richtext";
import { clsx } from "clsx";
import type { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Formula } from "@src/components/Molecules/Core/Formula/Formula";
import { Table } from "@src/components/Molecules/Core/Table/Table";
import { Tip } from "@src/components/Molecules/Core/Tip/Tip";

// Copied from https://github.com/storyblok/monoblok/packages/richtext/src/types/index.ts as these are not exported
enum BlockTypes {
  // DOCUMENT = "doc",
  HEADING = "heading", // eslint-disable-line no-unused-vars
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
  COMPONENT = "blok", // eslint-disable-line no-unused-vars
  TABLE = "table", // eslint-disable-line no-unused-vars
  TABLE_ROW = "tableRow", // eslint-disable-line no-unused-vars
  TABLE_CELL = "tableCell", // eslint-disable-line no-unused-vars
  TABLE_HEADER = "tableHeader", // eslint-disable-line no-unused-vars
}

enum MarkTypes {
  // BOLD = "bold",
  // STRONG = "strong",
  // STRIKE = "strike",
  // UNDERLINE = "underline",
  // ITALIC = "italic",
  // CODE = "code",
  LINK = "link", // eslint-disable-line no-unused-vars
  // ANCHOR = "anchor",
  // STYLED = "styled",
  // SUPERSCRIPT = "superscript",
  // SUBSCRIPT = "subscript",
  // TEXT_STYLE = "textStyle",
  // HIGHLIGHT = "highlight",
}

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

// List of components that we support being added to rich text
type ComponentName = "Formula" | "Table" | "Tip";

const COMPONENT_MAP: Record<ComponentName, FC<any>> = {
  Formula,
  Table,
  Tip,
};

// Override to include formula stylings if applicable
export const componentResolver: StoryblokRichTextNodeResolver<T> = (
  node: StoryblokRichTextNode<T>,
  context,
): T => {
  const blok = node.attrs?.body?.[0];

  if (blok) {
    const componentName: string = blok.component;

    if (Object.keys(COMPONENT_MAP).includes(componentName)) {
      const Component = COMPONENT_MAP[componentName as ComponentName];

      try {
        return renderToStaticMarkup(
          <Component key={blok._uid} {...blok} />,
        ) as unknown as T;
      } catch (error) {
        // If rendering fails for whatever reason, log a warning
        console.warn(
          `componentResolver warning: Error rendering "${componentName}" Component; ${error}`,
        );
      }
    } else {
      // If we are trying to render a blok we don't have a corresponding component for, log a warning
      console.warn(
        `componentResolver warning: Component "${componentName}" not found in COMPONENT_MAP.`,
      );
    }
  }

  // If not found component will be null so just return default implementation
  return context.render("span", {
    blok: blok && blok,
    id: node.attrs?.id,
    style: "display: none",
  }) as T;
};

// Custom heading resolver that adds our custom styling based on heading level
export const headingResolver: StoryblokRichTextNodeResolver<T> = (
  node: StoryblokRichTextNode<T>,
  context,
): T => {
  const headingStylingMap: Record<number, string> = {
    1: "heading-xl",
    2: "heading-l",
    3: "heading-m",
    4: "heading-s",
    5: "heading-xs",
  };

  const { level, ...rest } = node.attrs || {};

  let headingElement = `h${level}`;

  let attributes = processAttributes(rest);
  const levelStyle = headingStylingMap[level];
  // Add styling classes if available
  if (levelStyle) {
    attributes.class = levelStyle;
  }

  return context.render(headingElement, attributes, node.children) as T;
};

// Custom table resolver that adds our custom styling
export const tableResolver: StoryblokRichTextNodeResolver<T> = (
  node: StoryblokRichTextNode<T>,
  context,
): T => {
  let attributes = processAttributes(node.attrs);
  // Add styling to the attributes
  attributes.class = clsx("table", "table-borderless", "table-ppt");
  const children = node.children || (null as any);

  return context.render(
    "table",
    attributes,
    context.render("tbody", {}, children),
  ) as T;
};

// Custom link resolver that adds our custom styling
export const linkResolver: StoryblokRichTextNodeResolver<T> = (
  node: StoryblokRichTextNode<T>,
  context,
): T => {
  // // Add styling to the attributes
  let attributes = processAttributes(node.attrs);
  attributes.class = clsx(attributes.class, "text-link");

  const children = node.children || node.text || (null as any);

  return context.render("a", attributes, children) as T;
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
  [BlockTypes.COMPONENT]: componentResolver,
  // [TextTypes.TEXT, textResolver],
  [MarkTypes.LINK]: linkResolver,
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
  [BlockTypes.TABLE]: tableResolver,
  // [BlockTypes.TABLE_ROW, tableRowResolver],
  // [BlockTypes.TABLE_CELL, tableCellResolver],
  // [BlockTypes.TABLE_HEADER, tableHeaderResolver],
};
