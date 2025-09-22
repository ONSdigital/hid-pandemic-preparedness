import type { Meta, StoryObj } from "@storybook/react";

import referenceData from "@content/Home/references.json";

import { References } from "./References";
import type { ReferencesProps } from "./References.interface";

// Defines some options for button children so we can show how different button content is rendered
interface ReferencesOptions {
  None: ReferencesProps;
  References: ReferencesProps;
}

// Define refences options
const referencesOptions: ReferencesOptions = {
  None: { references: undefined },
  References: { references: referenceData.references },
};

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
  args: referencesOptions.None,
} satisfies Story;
