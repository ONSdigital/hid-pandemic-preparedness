import type { MouseEventHandler } from "react";

import type { StoryblokAsset, StoryblokMultilink } from "@src/types/storyblok";

export interface IconAndTextLinkProps {
  icon: "download" | "feedback" | "github" | "restart" | "share";
  label: string;
  asset?: StoryblokAsset;
  disabled?: boolean;
  link?: StoryblokMultilink;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
