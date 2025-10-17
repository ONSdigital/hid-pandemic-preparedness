import type { LinkData } from "@localTypes/LinkData";
import type { TagData } from "@localTypes/TagData";
import type { TextModuleProps } from "@components/Molecules/Core/TextModule/TextModule.interface";

export interface LearningModuleCardProps extends TextModuleProps {
  githubLink: LinkData;
  startLink: LinkData;
  readingTime: string;
  tags: TagData[];
  title: string;
}
