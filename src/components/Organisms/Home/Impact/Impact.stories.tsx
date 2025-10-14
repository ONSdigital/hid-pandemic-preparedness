import type { Meta, StoryObj } from "@storybook/react";

import impactProps from "./impact.json";
import { Impact } from "./Impact";
import type { ImpactProps } from "./Impact.interface";

const meta = {
  component: Impact,
  title: "Organisms/Home/Impact",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    _uid: { table: { disable: true } },
    cards: { table: { disable: true } },
  },
} satisfies Meta<typeof Impact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImpactStory = {
  name: "Impact",
  args: impactProps as ImpactProps,
} satisfies Story;
