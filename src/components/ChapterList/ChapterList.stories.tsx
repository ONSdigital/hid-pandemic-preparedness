import type { Meta, StoryObj } from "@storybook/react";

import { ChapterList } from "./ChapterList";
import chaptersData from "../../content/chapters.json";

const meta = {
  argTypes: {
    activeId: {
      control: {
        type: "select",
      },
      options: chaptersData.map((chapter) => chapter.id),
    },
    chapters: {
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
    activeId: "chapter1",
  },
  name: "ChapterList",
} satisfies Story;
