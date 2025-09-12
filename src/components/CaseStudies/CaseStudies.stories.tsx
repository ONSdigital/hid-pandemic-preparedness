import type { Meta, StoryObj } from "@storybook/react";
import { CaseStudies } from "./CaseStudies";

const meta = {
  component: CaseStudies,
  title: "Organisms/CaseStudies",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof CaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaseStudiesStory = {
  name: "CaseStudies",
} satisfies Story;
