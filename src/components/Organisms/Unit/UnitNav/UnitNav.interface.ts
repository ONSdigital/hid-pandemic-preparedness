import type { Chapter } from "@localTypes/Chapter";
import type { Link } from "@localTypes/Link";

export interface UnitNavProps {
  chapters: Chapter[];
  githubLink?: Link;
  activeChapterId?: string;
  onSelect?: (selectedId: string) => void; // eslint-disable-line no-unused-vars
}
