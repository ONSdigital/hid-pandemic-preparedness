import type { StatisticsCardProps } from "@/src/components/Molecules/Core/StatisticsCard/StatisticsCard.interface";
import type { ReferenceProps } from "@/src/components/Molecules/Core/Reference/Reference.interface";
import type { LinkProps } from "@/src/components/Molecules/Core/Link/Link.interface";

export interface StatisticsAndTextProps {
  _uid: string;
  title: string;
  subTitle: string;
  quotation: string;
  reference: ReferenceProps[];
  link: LinkProps;
  cards: StatisticsCardProps[];
}
