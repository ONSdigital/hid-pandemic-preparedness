import clsx from "clsx";
import type { FC } from "react";

import { TextModule } from "@/src/components/Molecules/Core/TextModule/TextModule";

import type { RichTextProps } from "./RichText.interface"

export const RichText: FC<RichTextProps> = (props) => {
  return (
    <div className={clsx("row")}>
      <TextModule richText={props.content} />
    </div>
  );
};
