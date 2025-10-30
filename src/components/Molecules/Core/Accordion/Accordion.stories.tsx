import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

import { Accordion } from "./Accordion";
import type { AccordionProps } from "./Accordion.interface";

const meta = {
  component: Accordion,
  title: "Molecules/Core/Accordion",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    items: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: [null, "primary"],
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const AccordionBodyContent: ReactNode = <>Here's the content</>;

const accordionProps: AccordionProps = {
  id: uuidv4(),
  items: [
    {
      id: slugify("Open example", { lower: true }),
      headerTitle: "Open example",
      bodyContent: AccordionBodyContent,
    },
    {
      id: slugify("Definition and importance of mortality analysis", {
        lower: true,
      }),
      headerTitle: "Definition and importance of mortality analysis",
      bodyContent: AccordionBodyContent,
    },
    {
      id: slugify("Key concepts", {
        lower: true,
      }),
      headerTitle: "Key concepts",
      bodyContent: AccordionBodyContent,
    },
  ],
};

export const AccordionStory = {
  args: accordionProps,
  name: "Accordion",
} satisfies Story;
