import type { Chapter } from "@localTypes/Chapter";

import type { StoryblokMultilink } from "@src/types/storyblok";

export interface UnitNavProps {
  chapters: Chapter[];
  githubLink?: StoryblokMultilink;
  activeChapterId?: string;
  onSelect?: (selectedId: string) => void; // eslint-disable-line no-unused-vars
}
