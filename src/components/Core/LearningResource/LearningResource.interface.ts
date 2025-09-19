import type { LearningModuleNavProps } from "../../LearningModuleNav/LearningModuleNav.interface";
import type { LearningResourceBlockProps } from "../../LearningResourceBlock/LearningResourceBlock.interface";
import type { IntroductionProps } from "../Introduction/Introduction.interface";

export interface LearningResourceProps {
  learningModuleNav: LearningModuleNavProps;
  introduction: IntroductionProps;
  learningResource: LearningResourceBlockProps;
}
