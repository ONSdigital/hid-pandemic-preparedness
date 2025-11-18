import type { StoryblokMultilinkUrl } from "@src/types/storyblok";

export interface NavigationRowProps {
  currentFullSlug: string;
  links: StoryblokMultilinkUrl[];
  subTitle?: string;
}
