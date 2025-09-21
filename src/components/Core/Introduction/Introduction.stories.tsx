import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Introduction } from "./Introduction";
import type { IntroductionProps } from "./Introduction.interface";

const meta = {
  component: Introduction,
  title: "Organisms/Core/Introduction",
  argTypes: {
    sections: {
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
  sections: [
    {
      id: uuidv4(),
      label: "Definition and Importance of Mortality Analysis",
      href: "/",
    },
    {
      id: uuidv4(),
      label: "Relevance and Coverage",
      href: "/",
    },
    {
      id: uuidv4(),
      label: "Uses of Mortality Analysis",
      href: "/",
    },
    {
      id: uuidv4(),
      label: "Example Users",
      href: "/",
    },
  ],
};

export const IntroductionStory = {
  name: "Introduction",
  args: introductionProps,
} satisfies Story;
