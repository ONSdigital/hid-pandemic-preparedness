import type { Meta, StoryObj } from "@storybook/react";

import { CaseStudies } from "./CaseStudies";
import caseStudiesData from "../../../content/caseStudies.json";

const meta = {
  component: CaseStudies,
  title: "Organisms/Home/CaseStudies",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof CaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaseStudiesStory = {
  name: "CaseStudies",
  args: caseStudiesData,
} satisfies Story;
