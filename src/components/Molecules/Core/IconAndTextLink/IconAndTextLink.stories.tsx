import type { Meta, StoryObj } from "@storybook/react";
import { IconAndTextLink } from "./IconAndTextLink";

const meta = {
  argTypes: {
    id: { table: { disable: true } },
    disabled: { table: { disable: true } },
    target: { table: { disable: true } },
  },
  component: IconAndTextLink,
  parameters: {
    layout: "centered",
  },
  title: "Components/IconAndTextLink",
} satisfies Meta<typeof IconAndTextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconAndTextLinkStory = {
  name: "IconAndTextLink",
  args: {
    href: "/",
    label: "OpenGITHUB",
    icon: "github",
  },
} satisfies Story;
