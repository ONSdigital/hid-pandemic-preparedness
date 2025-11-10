import type { Meta, StoryObj } from "@storybook/react";

import { ListGroupLinks } from "./ListGroup";
import listGroupLinksData from "./listGroupLinks.json?raw";

const meta = {
  component: ListGroupLinks,
  title: "Components/List group",
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof ListGroupLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListGroupLinksStory = {
  name: "Links",
  args: JSON.parse(listGroupLinksData),
} satisfies Story;
