import type { ISbStoryData } from "@storyblok/js";

export interface NavigationRowProps {
  currentFullSlug: string;
  stories?: ISbStoryData[];
  subTitle?: string;
}
