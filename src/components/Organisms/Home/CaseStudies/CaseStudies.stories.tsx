import type { Meta, StoryObj } from "@storybook/react";

import caseStudiesData from "@content/Home/caseStudies.json";

import { CaseStudies } from "./CaseStudies";

const meta = {
  argTypes: {
    mainCard: {
      table: {
        disable: true,
      },
    },
    smallCards: {
      table: {
        disable: true,
      },
    },
  },
  component: CaseStudies,
  title: "Organisms/Home/CaseStudies",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaseStudiesStory = {
  name: "CaseStudies",
  args: caseStudiesData,
} satisfies Story;
