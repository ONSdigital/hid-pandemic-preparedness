import type { Meta, StoryObj } from "@storybook/react";

import referenceData from "../../content/Home/references.json";
import { References } from "./References";
import type { ReferencesProps } from "./References.interface";

const meta = {
  component: References,
  title: "Organisms/References",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    references: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof References>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReferencesStory = {
  name: "References",
  args: referenceData,
} satisfies Story;
