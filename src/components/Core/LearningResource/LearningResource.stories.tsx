import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

import { parseMarkdown } from "../../../helpers/parseMarkdown";
import learningResourceMd1 from "@content/learning-resources/introduction/sections/1.md?raw";
import learningResourceMd2 from "@content/learning-resources/introduction/sections/2.md?raw";
import { LearningResource } from "./LearningResource";
import type { LearningResourceProps } from "@components/Core/LearningResource/LearningResource.interface";
import chaptersData from "@content/chapters.json";
import type { IntroductionProps } from "@components/Core/Introduction/Introduction.interface";
import type { LearningResourceBlockProps } from "../../LearningResourceBlock/LearningResourceBlock.interface";

const meta = {
  argTypes: {
    introductionProps: { table: { disable: true } },
    learningModuleNavProps: { table: { disable: true } },
    learningResourceBlockProps: { table: { disable: true } },
  },
  component: LearningResource,
  parameters: {
    layout: "centered",
  },
  title: "Organisms/Core/LearningResource",
} satisfies Meta<typeof LearningResource>;

export default meta;
type Story = StoryObj<typeof meta>;

// Introduction chapters should link to corresponding LearningResourceBlock(s)
const sharedId1 = uuidv4();
const sharedId2 = uuidv4();

const introductionProps: IntroductionProps = {
  title: "Introduction",
  subTitle:
    "This section introduces mortality analysis, explaining what it is, why it matters, and who uses it. It outlines the scope, relevance, and practical applications of mortality data in health and policy work.",
  chapters: [
    {
      id: uuidv4(),
      label: "Definition and Importance of Mortality Analysis",
      href: `#${sharedId1}`,
    },
    {
      id: uuidv4(),
      label: "Relevance and Coverage",
      href: `#${sharedId2}`,
    },
  ],
};

const htmlContent1 = await parseMarkdown(learningResourceMd1);
const htmlcontent2 = await parseMarkdown(learningResourceMd2);

const learningResourceBlockProps: LearningResourceBlockProps = {
  learningSections: [
    {
      id: sharedId1,
      title: "Definition of Mortality Analysis",
      htmlContent: DOMPurify.sanitize(htmlContent1),
    },
    {
      id: sharedId2,
      title: "Relevance and Coverage",
      htmlContent: DOMPurify.sanitize(htmlcontent2),
    },
  ],
};

const learningResourcesProps: LearningResourceProps = {
  learningModuleNavProps: {
    chapters: chaptersData,
    activeId: "chapter1",
  },
  introductionProps: introductionProps,
  learningResourceBlockProps: learningResourceBlockProps,
};

export const LearningResourceStory = {
  args: learningResourcesProps,
  name: "LearningResource",
} satisfies Story;
