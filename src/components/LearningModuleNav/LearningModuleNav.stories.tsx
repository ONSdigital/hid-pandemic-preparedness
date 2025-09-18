import type { Meta, StoryObj } from "@storybook/react";

import { LearningModuleNav } from "./LearningModuleNav";
import chaptersData from "@content/chapters.json";

const meta = {
  argTypes: {
    activeId: {
      control: {
        type: "select",
      },
      options: chaptersData.map((chapter) => chapter.id),
    },
    chapters: { table: { disable: true } },
  },
  component: LearningModuleNav,
  parameters: {
    layout: "centered",
  },
  title: "Components/LearningModuleNav",
} satisfies Meta<typeof LearningModuleNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LearningModuleNavStory = {
  args: {
    chapters: chaptersData,
    activeId: "chapter1",
  },
  name: "LearningModuleNav",
} satisfies Story;
