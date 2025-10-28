import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { UnitNav } from "./UnitNav";
import type { UnitNavProps } from "./UnitNav.interface";

const unitNavProps: UnitNavProps = {
  githubLink: {
    id: "",
    rel: "",
    url: "https://github.com",
    title: "Open Github",
    linktype: "url",
    fieldtype: "multilink",
    cached_url: "github.com",
  },
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
    activeChapterId: {
      control: {
        type: "select",
      },
      options: [null, ...unitNavProps.chapters.map((chapter) => chapter._uid)],
    },
    chapters: { table: { disable: true } },
    githubLink: { table: { disable: true } },
  },
  component: UnitNav,
  parameters: {
    layout: "centered",
  },
  title: "Organisms/Unit/UnitNav",
} satisfies Meta<typeof UnitNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnitNavStory = {
  args: unitNavProps,
  name: "UnitNav",
} satisfies Story;
