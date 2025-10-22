import type { CongratulationsProps } from "@components/Congratulations/Congratulations.interface";
import type { IntroductionProps } from "@components/Core/Introduction/Introduction.interface";
import type { LearningResourceBlockProps } from "@components/LearningResourceBlock/LearningResourceBlock.interface";
import type { LinkData } from "@localTypes/LinkData";
import type { UnitNavProps } from "@src/components/Organisms/Unit/UnitNav/UnitNav.interface";

export interface LearningResourceProps {
  unitNav: UnitNavProps;
  introduction: IntroductionProps;
  learningResource: LearningResourceBlockProps;
  link: LinkData;
  congratulations: CongratulationsProps;
  currentChapter: number;
  totalChapters: number;
}
