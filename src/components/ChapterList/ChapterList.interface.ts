import type { Chapter } from "../../types/Chapter";

export interface ChapterListProps {
  chapters: Chapter[];
  parentUrl: string;
  activeChapterId?: string;
}
