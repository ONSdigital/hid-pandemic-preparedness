import type { Meta, StoryObj } from "@storybook/react";

import { CaseStudies } from "./CaseStudies";
import caseStudiesData from "../../../content/Home/caseStudies.json";

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
    layout: "centered",
  },
} satisfies Meta<typeof CaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaseStudiesStory = {
  name: "CaseStudies",
  args: caseStudiesData,
} satisfies Story;
