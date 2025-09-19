import type { ListGroupChecksProps } from "../../ListGroup/ListGroup.interface";
import type { ExplainerProps } from "../Explainer/Explainer.interface";
import type { QuestionBlockProps } from "../QuestionBlock/QuestionBlock.interface";

export interface FilterMenuProps {
  explainerProps: ExplainerProps;
  listGroupChecksProps: ListGroupChecksProps;
  questionBlockListProps: QuestionBlockProps[];
}
