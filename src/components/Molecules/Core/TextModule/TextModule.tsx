import { renderRichText } from "@storyblok/astro";
import clsx from "clsx";
import type { FC } from "react";

import { overiddenResolvers } from "@src/helpers/resolvers";

import type { TextModuleProps } from "./TextModule.interface";

// Renders input `htmlContent` within outer div
export const TextModule: FC<TextModuleProps> = (props) => {
  // Either render rich text or pass through html content depending on what is provided via props
  let html = null;

  if (props.richText) {
    html = renderRichText(props.richText, {
      resolvers: overiddenResolvers,
    });
  } else if (props.htmlContent) {
    html = props.htmlContent;
  }

  return (
    <div
      className={clsx(props.className && props.className)}
      data-testid="text-module"
      dangerouslySetInnerHTML={{ __html: html ?? "" }}
    />
  );
};
