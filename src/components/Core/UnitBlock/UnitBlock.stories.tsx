import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { UnitBlock } from "./UnitBlock";
import type { UnitBlockProps } from "./UnitBlock.interface";

const meta = {
  component: UnitBlock,
  title: "Organisms/Core/UnitBlock",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    units: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof UnitBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const unitBlockProps: UnitBlockProps = {
  title: "All units within Epidemiological Analysis",
  units: [
    {
      id: uuidv4(),
      link: {
        href: "/",
        label: "Introduction to Mortality Analysis",
      },
      subTitle:
        "Introduction to principles and practices of mortality analysis.",
      tags: [
        {
          id: uuidv4(),
          title: "Mortality Analysis",
          type: "secondary",
        },
        {
          id: uuidv4(),
          title: "Beginner",
          type: "primary",
        },
      ],
      readingTime: "3 min",
    },
    {
      id: uuidv4(),
      link: {
        href: "/",
        label: "Mortality Analysis",
      },
      subTitle:
        "Leveraging existing administrative datasets to monitor trends.",
      tags: [
        {
          id: uuidv4(),
          title: "Mortality Analysis",
          type: "secondary",
        },
        {
          id: uuidv4(),
          title: "Beginner",
          type: "primary",
        },
      ],
      readingTime: "3 min",
    },
  ],
};

export const UnitBlockStory = {
  name: "UnitBlock",
  args: unitBlockProps,
} satisfies Story;
