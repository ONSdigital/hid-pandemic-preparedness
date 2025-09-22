import type { ListGroupChecksProps } from "@components/ListGroup/ListGroup.interface";
import type { ExplainerProps } from "@components/QuestionBank/Explainer/Explainer.interface";
import type { QuestionBlockProps } from "@components/QuestionBank/QuestionBlock/QuestionBlock.interface";

export interface FilterMenuProps {
  explainer: ExplainerProps;
  filterMenu: ListGroupChecksProps;
  questionBlocks: QuestionBlockProps[];
}
