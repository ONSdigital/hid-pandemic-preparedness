import type { LinkData } from "@localTypes/LinkData";
import type { CardStatProps } from "@/src/components/Molecules/Core/StatisticsCard/StatisticsCard.interface";

export interface StatisticsAndTextProps {
  attribution: string;
  attributionLink: LinkData;
  buttonLink: LinkData;
  quote: string;
  subTitle: string;
  statisticCards: CardStatProps[];
  title: string;
}
