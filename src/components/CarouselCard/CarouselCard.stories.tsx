import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  RiQuestionLine,
  RiRecordCircleLine,
  RiRhythmFill,
} from "@remixicon/react";

import CarouselCard from "./CarouselCard";
import type { CarouselCardProps } from "./CarouselCard.interface";
import { Link } from "../Link/Link";

interface CarouselCardIconOptions {
  RumourReport: ReactNode;
  SampleSizeCalculator: ReactNode;
  QuestionBank: ReactNode;
}

const RumourReportIcon: ReactNode = <RiRecordCircleLine />;
const SampleSizeCalculatorIcon: ReactNode = <RiRhythmFill />;
const QuestionBankIcon: ReactNode = <RiQuestionLine />;

const iconOptions: CarouselCardIconOptions = {
  RumourReport: RumourReportIcon,
  SampleSizeCalculator: SampleSizeCalculatorIcon,
  QuestionBank: QuestionBankIcon,
};

const meta = {
  argTypes: {
    iconComponent: {
      control: { type: "select" },
      name: "Icon",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
    linkComponent: {
      table: {
        disable: true,
      },
    },
  },
  component: CarouselCard,
  parameters: {
    layout: "centered",
  },
  title: "Components/CarouselCard",
} satisfies Meta<typeof CarouselCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const carouselLinkComponent: ReactNode = (
  <Link href="/internal" label="Try now" />
);

const carouselCardData: CarouselCardProps = {
  body: "A rumour report logs unverified claims or info in circulation.",
  iconComponent: iconOptions.RumourReport,
  linkComponent: carouselLinkComponent,
  title: "Rumour report",
};

export const CarouselCardStory = {
  name: "Carousel Card",
  args: carouselCardData,
} satisfies Story;
