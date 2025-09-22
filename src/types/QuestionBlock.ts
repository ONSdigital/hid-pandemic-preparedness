import type { QuestionData } from "@localTypes/QuestionData";
import type { TagData } from "@localTypes/TagData";

export interface QuestionBlock {
  id: string;
  title: string;
  tags: TagData[];
  questions: QuestionData[];
}
