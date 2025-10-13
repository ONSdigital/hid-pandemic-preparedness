import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudyCardProps } from "./CaseStudyCard.interface";

const meta = {
  component: CaseStudyCard,
  title: "Molecules/Core/CaseStudyCard",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
    size: {
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
} satisfies Meta<typeof CaseStudyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardCaseStudyProps: CaseStudyCardProps = {
  _uid: uuidv4(),
  size: "large",
  title: "Working with the Ministry of Health",
  subTitle:
    "Strengthening data-driven health strategies through close collaboration.",
  link: {
    id: uuidv4(),
    cached_url: "https://www.cemic.edu.ar/",
    fieldtype: "multilink",
    title: "About",
    linktype: "url",
    url: "https://www.cemic.edu.ar/",
  },
  image: {
    id: 99913189991725,
    alt: "A group of medical professionals chatting and smiling.",
    name: "",
    focus: "",
    title: "",
    source: "",
    filename: "./images/group-of-medical-professionals.jpeg",
    copyright: "",
    fieldtype: "asset",
    meta_data: {
      alt: "A group of medical professionals chatting and smiling.",
      title: "",
      source: "",
      copyright: "",
    },
    is_external_url: false,
  },
};

export const CaseStudyCardLargeStory = {
  args: { ...cardCaseStudyProps, size: "large" },
  name: "Large",
} satisfies Story;

export const CaseStudyCardSmallStory = {
  args: { ...cardCaseStudyProps, size: "small" },
  name: "Small",
} satisfies Story;
