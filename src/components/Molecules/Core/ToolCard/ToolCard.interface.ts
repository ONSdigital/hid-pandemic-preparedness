import type { Link } from "@localTypes/Link";

export interface ToolCardProps {
  id: string;
  icon: "calculator" | "dashboard" | "questionbank" | "report";
  title: string;
  subTitle: string;
  link: Link;
}
