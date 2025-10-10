import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { StatisticsCard } from "./StatisticsCard";
import type { StatisticsCardProps } from "./StatisticsCard.interface";

const meta = {
  component: StatisticsCard,
  title: "Molecules/Core/StatisticsCard",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
    image: {
      table: {
        disable: true,
      },
    },
    reference: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof StatisticsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const statisticsCardProps: StatisticsCardProps = {
  _uid: uuidv4(),
  title: "14.8 million+",
  subTitle: "Deaths from all respiratory disease 1980-2021.",
  reference: {
    _uid: uuidv4(),
    accessedDate: "19th August 2025",
    yearPublished: "2021",
    websiteAuthor: "The Independent Panel for Pandemic Preparedness & Response",
    websiteTitle: "COVID-19: Make it the Last Pandemic",
    websiteUrl:
      "https://theindependentpanel.org/wp-content/uploads/2021/05/COVID-19-Make-it-the-Last-Pandemic_final.pdf",
  },
  image: {
    id: 99913189991725,
    alt: "Bar chart showing deaths from all respiritory disease.",
    name: "",
    focus: "",
    title: "",
    source: "",
    filename: "./images/plots/stacked-bar-chart.svg",
    copyright: "",
    fieldtype: "asset",
    meta_data: {
      alt: "Bar chart showing deaths from all respiritory disease.",
      title: "",
      source: "",
      copyright: "",
    },
    is_external_url: false,
  },
};

export const StatisticsCardStory = {
  args: statisticsCardProps,
  name: "StatisticsCard",
} satisfies Story;
