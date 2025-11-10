import type { ListGroupChecksProps } from "@components/ListGroup/ListGroup.interface";
import type { QuestionBlockProps } from "@/src/components/Organisms/FilterableResources/QuestionBlock/QuestionBlock.interface";

export interface FilterableQuestionsProps {
  filterMenu: ListGroupChecksProps;
  questionBlocks: QuestionBlockProps[];
}
