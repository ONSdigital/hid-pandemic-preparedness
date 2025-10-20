import type { Meta, StoryObj } from "@storybook/react";

import { Overview } from "./Overview";
import type { OverviewProps } from "./Overview.interface";
import overviewData from "./overview.json";

const meta = {
  argTypes: {
    githubLink: {
      table: {
        disable: true,
      },
    },
    startLink: {
      table: {
        disable: true,
      },
    },
    overviewRichText: {
      table: {
        disable: true,
      },
    },
    tags: {
      table: {
        disable: true,
      },
    },
  },
  component: Overview,
  parameters: {
    layout: "centered",
  },
  title: "Organisms/UnitOverview/Overview",
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OverviewStory = {
  args: { ...overviewData } as OverviewProps,
  name: "Overview",
} satisfies Story;
