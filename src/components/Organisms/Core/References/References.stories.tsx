import type { Meta, StoryObj } from "@storybook/react";

// Home story contains some references we can use
import story from "@src/content/stories/home.json?raw";

import { createReferencesData } from "@src/helpers/createReferencesData";

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
  References: { references: createReferencesData(JSON.parse(story).story) },
};

const meta = {
  component: References,
  title: "Organisms/Core/References",
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

export const WithReferencesStory = {
  name: "Rendered with reference data",
  args: referencesOptions.References,
} satisfies Story;

export const WithoutReferencesStory = {
  name: "Rendered without reference data",
  args: referencesOptions.None,
} satisfies Story;
