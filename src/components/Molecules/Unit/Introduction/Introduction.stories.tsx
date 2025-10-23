import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Introduction } from "./Introduction";
import type { IntroductionProps } from "./Introduction.interface";

const meta = {
  component: Introduction,
  title: "Molecules/Unit/Introduction",
  argTypes: {
    sectionLinks: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Introduction>;

export default meta;
type Story = StoryObj<typeof meta>;

const introductionProps: IntroductionProps = {
  title: "Introduction",
  subTitle:
    "This section introduces mortality analysis, explaining what it is, why it matters, and who uses it. It outlines the scope, relevance, and practical applications of mortality data in health and policy work.",
  sectionLinks: [
    {
      id: uuidv4(),
      fieldtype: "multilink",
      linktype: "url",
      title: "Definition and Importance of Mortality Analysis",
      cached_url: "/",
      url: "/",
    },
    {
      id: uuidv4(),
      fieldtype: "multilink",
      linktype: "url",
      title: "Relevance and Coverage",
      cached_url: "/",
      url: "/",
    },
    {
      id: uuidv4(),
      fieldtype: "multilink",
      linktype: "url",
      title: "Uses of Mortality Analysis",
      cached_url: "/",
      url: "/",
    },
    {
      id: uuidv4(),
      fieldtype: "multilink",
      linktype: "url",
      title: "Example Users",
      cached_url: "/",
      url: "/",
    },
  ],
};

export const IntroductionStory = {
  name: "Introduction",
  args: introductionProps,
} satisfies Story;
