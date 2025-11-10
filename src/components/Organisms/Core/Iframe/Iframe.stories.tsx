import type { Meta, StoryObj } from "@storybook/react";

import iframeData from "./iframe.json?raw";
import { Iframe } from "./Iframe";
import type { IframeProps } from "./Iframe.interface";

const meta = {
  component: Iframe,
  title: "Organisms/Core/Iframe",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Iframe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IframeStory = {
  name: "Iframe",
  args: JSON.parse(iframeData) as IframeProps,
} satisfies Story;
