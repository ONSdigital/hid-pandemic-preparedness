import type { LearningModuleNavProps } from "@components/LearningModuleNav/LearningModuleNav.interface";
import type { LearningResourceBlockProps } from "@components/LearningResourceBlock/LearningResourceBlock.interface";
import type { IntroductionProps } from "@components/Core/Introduction/Introduction.interface";

export interface LearningResourceProps {
  learningModuleNavProps: LearningModuleNavProps;
  introductionProps: IntroductionProps;
  learningResourceBlockProps: LearningResourceBlockProps;
}
