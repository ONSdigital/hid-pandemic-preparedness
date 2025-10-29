import * as RemixIcons from "@remixicon/react";
import type { FC } from "react";
import type { IconProps } from "./Icon.interface";

export const Icon: FC<IconProps> = (props) => {
  // Tell typescript to treat iconName as a key of RemixIcons
  const iconName = props.iconName as keyof typeof RemixIcons;

  const RemixIcon = RemixIcons[iconName];

  if (!RemixIcon) return null;

  return <RemixIcon className={props.className} />;
};
