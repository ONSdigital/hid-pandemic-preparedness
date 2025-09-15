import type { CardCaseStudyProps } from "../../CardCaseStudy/CardCaseStudy.interface";

export interface CaseStudiesProps {
  title: string;
  mainCard: CardCaseStudyProps;
  smallCards: CardCaseStudyProps[];
}
