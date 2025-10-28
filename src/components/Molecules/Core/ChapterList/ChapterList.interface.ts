import type { Chapter } from "@src/types/Chapter";

export interface ChapterListProps {
  chapters: Chapter[];
  activeId?: string;
  onSelect?: (id: string) => void; // eslint-disable-line no-unused-vars
}
