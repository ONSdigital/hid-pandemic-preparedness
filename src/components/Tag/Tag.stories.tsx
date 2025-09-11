import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "./Tag";
import type { TagProps } from "./Tag.interface";

const meta = {
  component: Tag,
  title: "Components/Tag",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const tagData: TagProps = {
  title: "Reports",
  type: "primary",
};

export const TagStory = {
  name: "Tag",
  args: tagData,
} satisfies Story;
