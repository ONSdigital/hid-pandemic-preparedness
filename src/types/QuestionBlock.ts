import type { QuestionData } from "@src/types/QuestionData";
import type { TagData } from "@src/types/TagData";

export interface QuestionBlock {
  id: string;
  title: string;
  tags: TagData[];
  questions: QuestionData[];
}
