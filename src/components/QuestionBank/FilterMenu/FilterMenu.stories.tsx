import type { Meta, StoryObj } from "@storybook/react";
import { FilterMenu } from "./FilterMenu";

const meta = {
  component: FilterMenu,
  title: "Organisms/QuestionBank/FilterMenu",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof FilterMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterMenuStory = {
  name: "FilterMenu",
} satisfies Story;
