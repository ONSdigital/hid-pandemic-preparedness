import type { CardCaseStudyProps } from "@components/CardCaseStudy/CardCaseStudy.interface";

export interface CaseStudiesProps {
  title: string;
  mainCard: CardCaseStudyProps;
  smallCards: CardCaseStudyProps[];
}
