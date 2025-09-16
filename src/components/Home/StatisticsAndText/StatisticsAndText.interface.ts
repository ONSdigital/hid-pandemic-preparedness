import type { LinkData } from "../../../types/LinkData";
import type { CardStatProps } from "../../CardStat/CardStat.interface";

export interface StatisticsAndTextProps {
  title: string;
  quote: string;
  attribution: string;
  attributionLink: LinkData;
  statisticCards: CardStatProps[];
  link: LinkData;
}
