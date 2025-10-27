import type { ISbStoryData } from "storyblok-js-client";

export interface UnitNavProps {
  parentStory: ISbStoryData;
  chapterStories: ISbStoryData[];
  activeChapterSlug?: string;
}
