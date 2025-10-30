import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { ChapterList } from "./ChapterList";
import type { ChapterListProps } from "./ChapterList.interface";

const chapterListData: ChapterListProps = {
  chapters: [
    {
      _uid: uuidv4(),
      title: "Overview",
    },
    {
      _uid: uuidv4(),
      title: "Introduction to Mortality Analysis",
    },
    {
      _uid: uuidv4(),

      title: "Data Quality, Completeness and Data Cleaning",
    },
    {
      _uid: uuidv4(),
      title: "Key Concepts",
    },
    {
      _uid: uuidv4(),
      title: "Grouping and Analysing Mortality Data",
    },
  ],
};

const meta = {
  argTypes: {
    activeId: {
      control: {
        type: "select",
      },
      options: [...chapterListData.chapters.map((chapter) => chapter._uid)],
    },
    chapters: {
      table: {
        disable: true,
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
  },
  component: ChapterList,
  parameters: {
    layout: "centered",
  },
  title: "Molecules/Core/ChapterList",
} satisfies Meta<typeof ChapterList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChapterListStory = {
  args: chapterListData,
  name: "ChapterList",
} satisfies Story;
