import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Tag } from "./Tag";
import type { TagProps } from "./Tag.interface";

const meta = {
  component: Tag,
  title: "Molecules/Core/Tag",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const tagData: TagProps = {
  _uid: uuidv4(),
  title: "Reports",
  type: "location",
};

export const TagStory = {
  name: "Tag",
  args: tagData,
} satisfies Story;
