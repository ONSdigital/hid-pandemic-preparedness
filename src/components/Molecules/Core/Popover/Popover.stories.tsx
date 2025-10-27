import type { Meta, StoryObj } from "@storybook/react";
import { PopoverComponent } from "./Popover";

const meta = {
  component: PopoverComponent,
  title: "Molecules/Core/Popover",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof PopoverComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const popoverProps = {
  contentText:
    "(1) The Independent Panel for Pandemic Preparedness & Response. COVID-19: Make it the Last Pandemic. 2021. Available from: https://theindependentpanel.org/wp-content/uploads/2021/05/COVID-19-Make-it-the-Last-Pandemic_final.pdf [Accessed 19th August 2025]",
  triggerText: "Popover example",
};

export const PopoverStory = {
  name: "Popover",
  args: popoverProps,
} satisfies Story;
