import type { Chapter } from "@src/types/Chapter";
import type { Link } from "@src/types/Link";

export interface UnitNavProps {
  chapters: Chapter[];
  githubLink?: Link;
  activeChapterId?: string;
  onSelect?: (selectedId: string) => void; // eslint-disable-line no-unused-vars
}
