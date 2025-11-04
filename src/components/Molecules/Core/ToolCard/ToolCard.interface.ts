import type { StoryBlokLink } from "@localTypes/StoryBlokLink";

export interface ToolCardProps {
  id: string;
  icon: "calculator" | "dashboard" | "questionbank" | "report";
  title: string;
  subTitle: string;
  link: StoryBlokLink;
}
