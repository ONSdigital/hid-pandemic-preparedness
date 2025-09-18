import type { Meta, StoryObj } from "@storybook/react";

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
