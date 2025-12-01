import type { Meta, StoryObj } from "@storybook/react";

import { FilterableResources } from "@src/components/Organisms/FilterableResources/FilterableResources/FilterableResources";
import filterableResourcesJson from "@src/components/Organisms/FilterableResources/FilterableResources/filterableResources.json?raw";

const meta = {
  component: FilterableResources,
  title: "Organisms/FilterableResources/FilterableResources",
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof FilterableResources>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterableResourcesStory = {
  name: "FilterableResources",
  args: JSON.parse(filterableResourcesJson),
} satisfies Story;
