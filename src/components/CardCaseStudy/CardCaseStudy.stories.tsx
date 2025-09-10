import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { CardCaseStudy } from "./CardCaseStudy";
import type { CardCaseStudyProps } from "./CardCaseStudy.interface";

const meta = {
  component: CardCaseStudy,
  title: "Components/CardCaseStudy",
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
} satisfies Meta<typeof CardCaseStudy>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardCaseStudyProps: CardCaseStudyProps = {
  id: uuidv4(),
  title: "Working with the Ministry of Health",
  subTitle:
    "Strengthening data-driven health strategies through close collaboration.",
  link: {
    href: "/",
    label: "View all case studies",
  },
  image: {
    id: uuidv4(),
    altText: "A group of medical professionals chatting and smiling.",
    srcPath: "./example-images/group-of-medical-professionals.jpg",
  },
};

export const CardCaseStudyStory = {
  args: cardCaseStudyProps,
  name: "CardCaseStudy",
} satisfies Story;
