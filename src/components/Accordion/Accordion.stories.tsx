import type { Meta, StoryObj } from "@storybook/react";

import Accordion from "./Accordion";

const meta = {
  component: Accordion,
  title: "Components/Accordion",
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccordionStory = {
  name: "Accordion",
} satisfies Story;
