import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import type { Tag } from "@src/types/Tag";

import { Overview } from "./Overview";
// Importing raw here to avoid typescript errors when parsing strings to enums
import overviewDataJson from "./overview.json?raw";

const meta = {
  component: Overview,
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
  title: "Organisms/UnitOverview/Overview",
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create some tags to add to the data
const tags: Tag[] = [
  {
    id: uuidv4(),
    title: "Reports",
  },
  {
    id: uuidv4(),
    title: "Beginner",
  },
];

export const OverviewStory = {
  args: { ...JSON.parse(overviewDataJson), tags: tags },
  name: "Overview",
} satisfies Story;
