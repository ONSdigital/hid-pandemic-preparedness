import type { Meta, StoryObj } from "@storybook/react";

import { IconAndTextLink } from "./IconAndTextLink";

const meta = {
  argTypes: {
    asset: { table: { disable: true } },
    link: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  component: IconAndTextLink,
  parameters: {
    layout: "centered",
  },
  title: "Molecules/Core/IconAndTextLink",
} satisfies Meta<typeof IconAndTextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconAndTextLinkStory = {
  name: "IconAndTextLink",
  args: {
    label: "Open GITHUB",
    icon: "github",
  },
} satisfies Story;
