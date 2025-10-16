import clsx from "clsx";
import type { FC } from "react";
import { renderRichText } from "@storyblok/astro";

import { TextModule } from "@/src/components/Molecules/Core/TextModule/TextModule";

import styles from "./FullWidthRichText.module.scss";
import type { FullWidthRichTextProps } from "./FullWidthRichText.interface";

export const FullWidthRichText: FC<FullWidthRichTextProps> = (props) => {
  // Render the rich text content from props using Storyblok helper
  const renderedRichText = renderRichText(props.content);

  return (
    <div className={clsx("w-100", styles["full-width-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          {renderedRichText && <TextModule htmlContent={renderedRichText} />}
        </div>
      </div>
    </div>
  );
};
