import type { TagData } from "../../types/TagData";

export interface LearningModuleProps {
  githubLinkHref: string;
  learningOutcomesList: string[];
  learningOutcomesTitle: string;
  startLinkHref: string;
  readingTime: string;
  tags: TagData[];
  textBold: string;
  textRegular: string;
  title: string;
}
