import * as RemixIcons from "@remixicon/react";
import type { FC } from "react";
import type { IconProps } from "./Icon.interface";

export const Icon: FC<IconProps> = (props) => {
  const RemixIcon = RemixIcons[props.iconName];

  if (!RemixIcon) return null;

  return <RemixIcon className={props.className} />;
};
