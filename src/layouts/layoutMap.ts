import type { FC } from "react";

import BasicPage from "./BasicPage.astro";
import HomePage from "./HomePage.astro";
import Unit from "./Unit.astro";

// List of layouts that we have corresponding content types for in Storyblok
export type LayoutName = "BasicPage" | "HomePage" | "Unit";

export const LAYOUT_MAP: Record<LayoutName, FC<any>> = {
  BasicPage,
  HomePage,
  Unit,
};
