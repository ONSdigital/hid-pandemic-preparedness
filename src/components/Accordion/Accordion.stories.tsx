import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Accordion } from "./Accordion";
import type { AccordionProps } from "./Accordon.interface";

const meta = {
  component: Accordion,
  title: "Components/Accordion",
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
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const AccordionBodyContent: ReactNode = <>Here's the content</>;

const accordionProps: AccordionProps = {
  id: uuidv4(),
  items: [
    {
      id: uuidv4(),
      headerTitle: "Open example",
      bodyContent: AccordionBodyContent,
    },
    {
      id: uuidv4(),
      headerTitle: "Definition and importance of mortality analysis",
      bodyContent: AccordionBodyContent,
    },
    {
      id: uuidv4(),
      headerTitle: "Definition and importance of mortality analysis",
      bodyContent: AccordionBodyContent,
    },
  ],
};

export const AccordionStory = {
  args: accordionProps,
  name: "Accordion",
} satisfies Story;
