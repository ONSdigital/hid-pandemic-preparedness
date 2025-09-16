import type { LinkData } from "../../../types/LinkData";
import type { CardStatProps } from "../../CardStat/CardStat.interface";

export interface StatisticsAndTextProps {
  attribution: string;
  attributionLink: LinkData;
  link: LinkData;
  quote: string;
  subTitle: string;
  statisticCards: CardStatProps[];
  title: string;
}
