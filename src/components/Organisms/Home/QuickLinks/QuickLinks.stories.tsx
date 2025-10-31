import type { Meta, StoryObj } from "@storybook/react";

// import menuItems from "../../../content/menuItems.json";
import quickLinksData from "./quicklinks.json?raw";
import { QuickLinks } from "./QuickLinks";
import type { QuickLinksProps } from "./QuickLinks.interface";

const meta = {
  component: QuickLinks,
  title: "Organisms/Home/QuickLinks",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    links: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof QuickLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QuickLinksStory = {
  name: "QuickLinks",
  args: JSON.parse(quickLinksData) as QuickLinksProps,
} satisfies Story;
