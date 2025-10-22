import type { Meta, StoryObj } from "@storybook/react";

import footerData from "./footer.json?raw";
import { Footer } from "./Footer";
import type { FooterProps } from "./Footer.interface";

const meta = {
  component: Footer,
  title: "Organisms/Footer",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    columns: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterStory = {
  name: "Footer",
  args: JSON.parse(footerData) as FooterProps, //Without parsing, TypeScript cannot infer the type correctly
} satisfies Story;
