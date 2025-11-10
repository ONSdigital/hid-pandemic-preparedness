import type { Meta, StoryObj } from "@storybook/react";

import { MegaMenu } from "./MegaMenu";
import MegaMenuData from "./megaMenu.json?raw";

const meta = {
  component: MegaMenu,
  title: "Components/MegaMenu",
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof MegaMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MegaMenuStory = {
  name: "MegaMenu",
  args: JSON.parse(MegaMenuData),
} satisfies Story;
