import type { CongratulationsProps } from "@components/Congratulations/Congratulations.interface";
import type { IntroductionProps } from "@components/Core/Introduction/Introduction.interface";
import type { LearningModuleNavProps } from "@components/LearningModuleNav/LearningModuleNav.interface";
import type { LearningResourceBlockProps } from "@components/LearningResourceBlock/LearningResourceBlock.interface";
import type { LinkData } from "@localTypes/LinkData";

export interface LearningResourceProps {
  learningModuleNav: LearningModuleNavProps;
  introduction: IntroductionProps;
  learningResource: LearningResourceBlockProps;
  link: LinkData;
  congratulations: CongratulationsProps;
  currentChapter: number;
  totalChapters: number;
}
