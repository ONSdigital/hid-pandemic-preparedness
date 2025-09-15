import type { Meta, StoryObj } from "@storybook/react";
import { TextModule } from "./TextModule";
import type { TextModuleProps } from "./TextModule.interface";

const meta = {
  component: TextModule,
  title: "Components/TextModule",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TextModule>;

export default meta;
type Story = StoryObj<typeof meta>;

const textModuleProps: TextModuleProps = {
  content: "Search all resources",
};

export const HeaderStory = {
  name: "Text Module",
  args: textModuleProps,
} satisfies Story;
