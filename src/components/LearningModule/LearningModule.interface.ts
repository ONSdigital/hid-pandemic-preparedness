import type { TagData } from "../../types/TagData";

export interface LearningModuleProps {
  learningOutcomesList: string[];
  learningOutcomesTitle: string;
  readingTime: string;
  tags: TagData[];
  textBold: string;
  textRegular: string;
  title: string;
}
