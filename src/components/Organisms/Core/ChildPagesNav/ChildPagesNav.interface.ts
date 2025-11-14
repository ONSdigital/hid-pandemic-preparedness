import type { ISbStoryData } from "@storyblok/js";

export interface ChildPagesNavProps {
  currentFullSlug: string;
  parentFullSlug: string;
  stories?: ISbStoryData[];
  subTitle?: string;
}
