import type { Meta, StoryObj } from "@storybook/react";

import chaptersData from "@content/chapters.json";

import { ChapterList } from "./ChapterList";

const meta = {
  argTypes: {
    activeChapterId: {
      control: {
        type: "select",
      },
      options: [null, ...chaptersData.map((chapter) => chapter.id)],
    },
    chapters: {
      table: {
        disable: true,
      },
    },
    parentUrl: {
      table: {
        disable: true,
      },
    },
  },
  component: ChapterList,
  parameters: {
    layout: "centered",
  },
  title: "Components/ChapterList",
} satisfies Meta<typeof ChapterList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChapterListStory = {
  args: {
    chapters: chaptersData,
    activeChapterId: "chapter1",
    parentUrl: "https://ons.gov.uk/",
  },
  name: "ChapterList",
} satisfies Story;
