import type { StoryblokMultilinkUrl } from "@src/types/storyblok";

export interface NavigationRowProps {
  currentFullSlug: string;
  resolvedLinks: StoryblokMultilinkUrl[];
  subTitle?: string;
}
