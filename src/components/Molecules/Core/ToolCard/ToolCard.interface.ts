import type { Link } from "@/src/types/Link";

export interface ToolCardProps {
  id: string;
  icon: "calculator" | "dashboard" | "questionbank" | "report";
  title: string;
  subTitle: string;
  link: Link;
}
