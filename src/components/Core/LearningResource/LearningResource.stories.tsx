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
  argTypes: {},
  component: LearningResource,
  parameters: {
    layout: "centered",
  },
  title: "Organisms/Core/LearningResource",
} satisfies Meta<typeof LearningResource>;

export default meta;
type Story = StoryObj<typeof meta>;

const introductionProps: IntroductionProps = {
  title: "Introduction",
  subTitle:
    "This section introduces mortality analysis, explaining what it is, why it matters, and who uses it. It outlines the scope, relevance, and practical applications of mortality data in health and policy work.",
  chapters: [
    {
      id: uuidv4(),
      label: "Definition and Importance of Mortality Analysis",
      href: "/",
    },
    {
      id: uuidv4(),
      label: "Relevance and Coverage",
      href: "/",
    },
    {
      id: uuidv4(),
      label: "Uses of Mortality Analysis",
      href: "/",
    },
    {
      id: uuidv4(),
      label: "Example Users",
      href: "/",
    },
  ],
};

const htmlContent1 = await parseMarkdown(learningResourceMd1);
const htmlcontent2 = await parseMarkdown(learningResourceMd2);

const learningResourceBlockProps: LearningResourceBlockProps = {
  learningResources: [
    {
      id: uuidv4(),
      title: "Definition of Mortality Analysis",
      htmlContent: DOMPurify.sanitize(htmlContent1),
    },
    {
      id: uuidv4(),
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
