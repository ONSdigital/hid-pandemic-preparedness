import type { FC } from "react";

import BasicPage from "./BasicPage.astro";

// List of layouts that we have corresponding content types for in Storyblok
export type LayoutName = "BasicPage";

export const LAYOUT_MAP: Record<LayoutName, FC<any>> = {
  BasicPage,
};
