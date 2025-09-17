import type { QuestionData } from "../../../types/QuestionData";
import type { TagData } from "../../../types/TagData";

export interface QuestionBlockProps {
  id: string;
  title: string;
  tags: TagData[];
  questions: QuestionData[];
}
