import type { Meta, StoryObj } from "@storybook/react";

import chaptersData from "@content/chapters.json";

import { LearningModuleNav } from "./LearningModuleNav";

const meta = {
  argTypes: {
    activeChapterId: {
      control: {
        type: "select",
      },
      options: [null, ...chaptersData.map((chapter) => chapter.id)],
    },
    chapters: { table: { disable: true } },
    parentUrl: { table: { disable: true } },
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
    activeChapterId: "chapter1",
    parentUrl: "https://ons.gov.uk/",
  },
  name: "LearningModuleNav",
} satisfies Story;
