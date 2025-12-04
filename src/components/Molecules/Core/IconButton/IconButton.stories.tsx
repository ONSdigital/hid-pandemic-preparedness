import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";

import iconButtonLinkData from "./iconButtonLink.json?raw";
import iconButtonDownloadData from "./iconButtonDownload.json?raw";

const meta = {
  component: IconButton,
  title: "Molecules/Core/IconButton",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    _editable: {
      table: {
        disable: true,
      },
    },
    _uid: {
      table: {
        disable: true,
      },
    },
    component: {
      table: {
        disable: true,
      },
    },
    downloadableContent: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    link: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconButtonLinkStory = {
  name: "IconButton Link",
  args: JSON.parse(iconButtonLinkData),
} satisfies Story;

export const IconButtonDownloadStory = {
  name: "IconButton Download",
  args: JSON.parse(iconButtonDownloadData),
} satisfies Story;
