import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

// import learningResourceMd1 from "../../../content/LearningResource/introduction/sections/1.md?raw";
// import learningResourceMd2 from "../../../content/LearningResource/introduction/sections/2.md?raw";
import { LearningResourceBlock } from "./LearningResourceBlock";

const meta = {
  component: LearningResourceBlock,
  title: "Organisms/Core/LearningResourceBlock",
  argTypes: {},
} satisfies Meta<typeof LearningResourceBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IntroductionStory = {
  name: "LearningResourceBlock",
  args: {},
} satisfies Story;
