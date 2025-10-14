import type { CaseStudyCardProps } from "@src/components/Molecules/Core/CaseStudyCard/CaseStudyCard.interface";

export interface CaseStudiesProps {
  _uid: string;
  title: string;
  mainCard: CaseStudyCardProps[];
  smallCards: CaseStudyCardProps[];
}
