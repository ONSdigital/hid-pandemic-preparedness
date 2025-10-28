import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import type { Tag } from "@src/types/Tag";

import { UnitOverview } from "./UnitOverview";
// Importing raw here to avoid typescript errors when parsing strings to enums
import overviewDataJson from "./overview.json?raw";

const meta = {
  component: UnitOverview,
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
  title: "Organisms/Unit/UnitOverview",
} satisfies Meta<typeof UnitOverview>;

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

export const unitOverviewStory = {
  args: { ...JSON.parse(overviewDataJson), tags: tags },
  name: "UnitOverview",
} satisfies Story;
