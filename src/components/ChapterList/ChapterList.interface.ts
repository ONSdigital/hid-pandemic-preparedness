import type { Chapter } from "../../types/Chapter";

export interface ChapterListProps {
  chapters: Chapter[];
  activeId: string;
}
