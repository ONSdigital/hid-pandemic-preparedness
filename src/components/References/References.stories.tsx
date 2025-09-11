import type { Meta, StoryObj } from "@storybook/react";

import referenceData from "../../content/references.json";
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

const referencesProps: ReferencesProps = {
  references: referenceData,
};

export const ReferencesStory = {
  name: "References",
  args: referencesProps,
} satisfies Story;
