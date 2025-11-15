import type { FC } from "react";

import BasicPage from "./BasicPage.astro";
import FilterableResources from "./FilterableResources.astro";
import HomePage from "./HomePage.astro";
import SupportingInformation from "./SupportingInformation.astro";
import Unit from "./Unit.astro";

// List of layouts that we have corresponding content types for in Storyblok
export type LayoutName =
  | "BasicPage"
  | "FilterableResources"
  | "HomePage"
  | "SupportingInformation"
  | "Unit";

export const LAYOUT_MAP: Record<LayoutName, FC<any>> = {
  BasicPage,
  FilterableResources,
  HomePage,
  SupportingInformation,
  Unit,
};
