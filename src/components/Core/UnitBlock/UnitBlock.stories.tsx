import type { Meta, StoryObj } from "@storybook/react";

import unitBlockData from "@content/learning-resources/data-analysis/epidemiological-analysis/unitBlock.json";

import { UnitBlock } from "./UnitBlock";
import type { UnitBlockProps } from "./UnitBlock.interface";

const meta = {
  component: UnitBlock,
  title: "Organisms/Core/UnitBlock",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    units: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof UnitBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnitBlockStory = {
  name: "UnitBlock",
  args: unitBlockData as UnitBlockProps,
} satisfies Story;
