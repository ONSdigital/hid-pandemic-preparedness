import type { LearningModuleNavProps } from "../../LearningModuleNav/LearningModuleNav.interface";
import type { LearningResourceBlockProps } from "../../LearningResourceBlock/LearningResourceBlock.interface";
import type { IntroductionProps } from "../Introduction/Introduction.interface";

export interface LearningResourceProps {
  learningModule: LearningModuleNavProps;
  introduction: IntroductionProps;
  learningResource: LearningResourceBlockProps;
}
