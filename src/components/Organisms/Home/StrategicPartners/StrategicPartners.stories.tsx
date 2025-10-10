import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import strategicPartnersProps from "./strategic-partners.json";
import { StrategicPartners } from "./StrategicPartners";
import type { StrategicPartnersProps } from "./StrategicPartners.interface";

const meta = {
  component: StrategicPartners,
  title: "Organisms/Home/StrategicPartners",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    _uid: { table: { disable: true } },
    partners: { table: { disable: true } },
  },
} satisfies Meta<typeof StrategicPartners>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StrategicPartnersStory = {
  name: "StrategicPartners",
  args: strategicPartnersProps as StrategicPartnersProps,
} satisfies Story;
