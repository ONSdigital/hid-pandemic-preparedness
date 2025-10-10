import type { Meta, StoryObj } from "@storybook/react";

import { StatisticsAndText } from "./StatisticsAndText";
import statisticsAndTextData from "./statistics-and-text.json";
import type { StatisticsAndTextProps } from "./StatisticsAndText.interface";

const meta = {
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
    cards: {
      table: {
        disable: true,
      },
    },
    reference: {
      table: {
        disable: true,
      },
    },
    link: {
      table: {
        disable: true,
      },
    },
  },
  component: StatisticsAndText,
  title: "Organisms/Home/StatisticsAndText",
} satisfies Meta<typeof StatisticsAndText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StatisticsAndTextStory = {
  name: "StatisticsAndText",
  args: statisticsAndTextData as StatisticsAndTextProps,
} satisfies Story;
