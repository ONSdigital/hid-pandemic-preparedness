import type { Meta, StoryObj } from "@storybook/react";

import { StatisticsAndText } from "./StatisticsAndText";
import StatisticsAndTextData from "../../../content/Home/statisticsAndText.json";

const meta = {
  argTypes: { statisticCards: { table: { disable: true } } },
  component: StatisticsAndText,
  title: "Organisms/Home/StatisticsAndText",
} satisfies Meta<typeof StatisticsAndText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StatisticsAndTextStory = {
  name: "StatisticsAndText",
  args: StatisticsAndTextData,
} satisfies Story;
