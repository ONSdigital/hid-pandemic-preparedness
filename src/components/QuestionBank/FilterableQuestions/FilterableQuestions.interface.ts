import type { ListGroupChecksProps } from "@components/ListGroup/ListGroup.interface";
import type { QuestionBlockProps } from "@components/QuestionBank/QuestionBlock/QuestionBlock.interface";

export interface FilterableQuestionsProps {
  filterMenu: ListGroupChecksProps;
  questionBlocks: QuestionBlockProps[];
}
