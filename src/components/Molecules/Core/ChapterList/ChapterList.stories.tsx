import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { ChapterList } from "./ChapterList";
import type { ChapterListProps } from "./ChapterList.interface";

const chapterListData: ChapterListProps = {
  parent: {
    _uid: uuidv4(),
    fullSlug:
      "learning-resources/data-analysis/epidemiological-analysis/mortality-analysis",
    title: "Overview",
  },
  chapters: [
    {
      _uid: uuidv4(),
      fullSlug:
        "learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/1",
      title: "Introduction to Mortality Analysis",
    },
    {
      _uid: uuidv4(),
      fullSlug:
        "learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/2",
      title: "Data Quality, Completeness and Data Cleaning",
    },
    {
      _uid: uuidv4(),
      fullSlug:
        "learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/3",
      title: "Key Concepts",
    },
    {
      _uid: uuidv4(),
      fullSlug:
        "learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/4",
      title: "Grouping and Analysing Mortality Data",
    },
  ],
};

const meta = {
  argTypes: {
    activeChapterSlug: {
      control: {
        type: "select",
      },
      options: [
        null,
        chapterListData.parent.fullSlug,
        ...chapterListData.chapters.map((chapter) => chapter.fullSlug),
      ],
    },
    chapters: {
      table: {
        disable: true,
      },
    },
    parent: {
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
