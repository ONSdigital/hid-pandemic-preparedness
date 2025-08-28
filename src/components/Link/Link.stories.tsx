import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./Link";

// Defines some options for button children so we can show how different button content is rendered
interface HrefOptions {
  EmptyLink: string;
  InternalNavigationLink: string;
  ExternalLink: string;
}

// Define the href opions
const hrefOptions: HrefOptions = {
  EmptyLink: "#",
  InternalNavigationLink: "/about",
  ExternalLink: "https://www.ons.gov.uk/",
};

const meta = {
  component: Link,
  title: "Components/Link",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    asButton: {
      table: {
        disable: true,
      },
    },
    href: {
      control: { type: "select" },
      name: "Link href",
      options: Object.keys(hrefOptions),
      mapping: hrefOptions,
    },
    disabled: {
      control: { type: "boolean" },
      name: "Disabled",
    },
    target: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkStory = {
  name: "Link",
  args: {
    disabled: false,
    href: hrefOptions.EmptyLink,
    label: "My link",
  },
} satisfies Story;
