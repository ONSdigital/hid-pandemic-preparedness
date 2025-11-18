import type { Meta, StoryObj } from "@storybook/react";

import { FilterableResourcesItem } from "./FilterableResourcesItem";
import filterableResourcesJson from "./filterableResourcesItem.json?raw";

const meta = {
  component: FilterableResourcesItem,
  title: "Molecules/FilterableResouces/FilterableResourcesItem",
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof FilterableResourcesItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterableResourcesItemStory = {
  name: "FilterableResourcesItem",
  args: JSON.parse(filterableResourcesJson),
} satisfies Story;
