import type { LinkData } from "../../../types/LinkData";
import type { CardStatProps } from "../../CardStat/CardStat.interface";

export interface StatisticsAndTextProps {
  attribution: string;
  attributionLink: LinkData;
  buttonLink: LinkData;
  quote: string;
  subTitle: string;
  statisticCards: CardStatProps[];
  title: string;
}
