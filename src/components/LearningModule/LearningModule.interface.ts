import type { TagData } from "../../types/TagData";
import type { TextModuleProps } from "../TextModule/TextModule.interface";

export interface LearningModuleProps extends TextModuleProps {
  githubLinkHref: string;
  startLinkHref: string;
  readingTime: string;
  tags: TagData[];
  title: string;
}
