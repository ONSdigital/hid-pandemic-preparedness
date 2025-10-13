import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

import type { IntroductionProps } from "@components/Core/Introduction/Introduction.interface";
import { LearningResource } from "@components/Core/LearningResource/LearningResource";
import type { LearningResourceProps } from "@components/Core/LearningResource/LearningResource.interface";
import type { LearningResourceBlockProps } from "@components/LearningResourceBlock/LearningResourceBlock.interface";
import chaptersData from "@content/chapters.json";
import congratulationsContent from "@content/learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/congratulationsContent.md?raw";
import congratulationsData from "@content/learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/congratulationsTitle.json";
import learningResourceMd1 from "@content/learning-resources/introduction/sections/1.md?raw";
import learningResourceMd2 from "@content/learning-resources/introduction/sections/2.md?raw";
import { parseMarkdown } from "@src/helpers/parseMarkdown";

const meta = {
  component: LearningResource,
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
  },
  title: "Organisms/Core/LearningResource",
} satisfies Meta<typeof LearningResource>;

export default meta;
type Story = StoryObj<typeof meta>;

// Introduction chapters should link to corresponding LearningResourceBlock(s)
const sharedId1 = "section1";
const sharedId2 = "section2";

const introductionProps: IntroductionProps = {
  title: "Introduction",
  subTitle:
    "This section introduces mortality analysis, explaining what it is, why it matters, and who uses it. It outlines the scope, relevance, and practical applications of mortality data in health and policy work.",
  sections: [
    {
      id: uuidv4(),
      label: "Definition and Importance of Mortality Analysis",
      href: sharedId1,
    },
    {
      id: uuidv4(),
      label: "Relevance and Coverage",
      href: sharedId2,
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

const congratulationsHtmlContent = await parseMarkdown(congratulationsContent);

const learningResourcesProps: LearningResourceProps = {
  learningModuleNav: {
    chapters: chaptersData,
    activeChapterId: "chapter1",
    parentUrl: "https://ons.gov.uk/",
  },
  introduction: introductionProps,
  learningResource: learningResourceBlockProps,
  link: {
    href: "/",
    label: "End learning",
  },
  congratulations: {
    title: congratulationsData.title,
    htmlContent: congratulationsHtmlContent,
  },
  currentChapter: 1,
  totalChapters: 1,
};

export const LearningResourceStory = {
  args: learningResourcesProps,
  name: "LearningResource",
} satisfies Story;
