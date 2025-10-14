import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { ImpactCard } from "./ImpactCard";
import type { ImpactCardProps } from "./ImpactCard.interface";

const meta = {
  component: ImpactCard,
  title: "Molecules/Home/ImpactCard",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    _uid: { table: { disable: true } },
  },
} satisfies Meta<typeof ImpactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const impactCardProps: ImpactCardProps = {
  _uid: uuidv4(),
  icon: "users",
  title: "100,000+ users",
  subTitle: "of Analysis for Action resources so far",
};

export const ImpactCardStory = {
  name: "ImpactCard",
  args: impactCardProps,
} satisfies Story;
