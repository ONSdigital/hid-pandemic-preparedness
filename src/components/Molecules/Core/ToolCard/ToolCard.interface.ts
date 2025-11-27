import type { StoryblokMultilink } from "@src/types/storyblok";

export interface ToolCardProps {
  id: string;
  icon: "calculator" | "dashboard" | "questionbank" | "report";
  title: string;
  subTitle: string;
  link: StoryblokMultilink;
}
