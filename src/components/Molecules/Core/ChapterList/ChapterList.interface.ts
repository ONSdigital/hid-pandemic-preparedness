import type { Chapter } from "@src/types/Chapter";

export interface ChapterListProps {
  parent: Chapter;
  chapters: Chapter[];
  activeChapterSlug?: string;
}
