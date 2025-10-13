import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import type { CardCaseStudyProps } from "../CardCaseStudy/CardCaseStudy.interface";
import { CardCaseStudySmall } from "./CardCaseStudySmall";

const meta = {
  component: CardCaseStudySmall,
  title: "Components/Cards/CardCaseStudySmall",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    image: {
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
} satisfies Meta<typeof CardCaseStudySmall>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardCaseStudySmallProps: CardCaseStudyProps = {
  id: uuidv4(),
  title: "Using administrative data during COVID-19",
  subTitle: "Leveraging existing administrative datasets to monitor trends.",
  link: {
    href: "/",
    label: "View all case studies",
  },
  image: {
    id: uuidv4(),
    altText: "A group of medical professionals chatting and smiling.",
    srcPath: "./images/group-of-medical-professionals.jpeg",
  },
};

export const CardCaseStudySmallStory = {
  args: cardCaseStudySmallProps,
  name: "CardCaseStudySmall",
} satisfies Story;
