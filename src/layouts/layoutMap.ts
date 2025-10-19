import type { FC } from "react";

import BasicPage from "./BasicPage.astro";
import HomePage from "./HomePage.astro";

// List of layouts that we have corresponding content types for in Storyblok
export type LayoutName = "BasicPage" | "HomePage";

export const LAYOUT_MAP: Record<LayoutName, FC<any>> = {
  BasicPage,
  HomePage,
};
