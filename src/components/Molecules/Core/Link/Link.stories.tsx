import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

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
  title: "Molecules/Core/Link",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    asButton: {
      table: {
        disable: true,
      },
    },
    buttonVariant: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    url: {
      control: { type: "select" },
      name: "Link href",
      options: Object.keys(hrefOptions),
      mapping: hrefOptions,
    },
    target: {
      table: {
        disable: true,
      },
    },
    textInverse: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkNormalStory = {
  name: "Rendered normally",
  args: {
    id: uuidv4(),
    fieldtype: "multilink",
    linktype: "url",
    asButton: false,
    disabled: false,
    url: hrefOptions.EmptyLink,
    cached_url: hrefOptions.EmptyLink,
    title: "My link",
    textInverse: false,
  },
} satisfies Story;

export const LinkNormalInverseStory = {
  name: "Rendered normally inverse",
  args: {
    id: uuidv4(),
    fieldtype: "multilink",
    linktype: "url",
    asButton: false,
    disabled: false,
    url: hrefOptions.EmptyLink,
    cached_url: hrefOptions.EmptyLink,
    title: "My link",
    textInverse: true,
  },
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Story;

export const LinkAsButtonStory = {
  name: "Rendered as a button",
  args: {
    id: uuidv4(),
    fieldtype: "multilink",
    linktype: "url",
    asButton: true,
    disabled: false,
    buttonVariant: "secondary",
    url: hrefOptions.EmptyLink,
    cached_url: hrefOptions.EmptyLink,
    title: "My link",
    textInverse: false,
  },
} satisfies Story;
