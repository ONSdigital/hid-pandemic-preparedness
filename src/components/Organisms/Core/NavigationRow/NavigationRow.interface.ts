import type { ISbStoryData } from "@storyblok/js";

export interface NavigationRowProps {
  currentFullSlug: string;
  parentFullSlug: string;
  stories?: ISbStoryData[];
  subTitle?: string;
}
