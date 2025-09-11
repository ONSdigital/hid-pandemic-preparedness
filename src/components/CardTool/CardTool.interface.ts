import type { LinkData } from "../../types/LinkData";

export interface CardIconProps {
  id: string;
  icon: "calculator" | "dashboard" | "questionbank" | "report";
  title: string;
  subTitle: string;
  link: LinkData;
}
