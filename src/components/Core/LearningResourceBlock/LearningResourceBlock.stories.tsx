import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

import { parseMarkdown } from "../../../helpers/parseMarkdown";
import learningResourceMd1 from "@content/learning-resources/introduction/sections/1.md?raw";
import learningResourceMd2 from "../../../content/learning-resources/introduction/sections/2.md?raw";
import { LearningResourceBlock } from "./LearningResourceBlock";
import type { LearningResourceBlockProps } from "./LearningResourceBlock.interface";

const meta = {
  component: LearningResourceBlock,
  title: "Organisms/Core/LearningResourceBlock",
  argTypes: {},
} satisfies Meta<typeof LearningResourceBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const IntroductionStory = {
  name: "LearningResourceBlock",
  args: learningResourceBlockProps,
} satisfies Story;
