import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "./SearchBar";
import { fn } from "storybook/test";

const meta = {
  title: "Components/SearchBar",
  component: SearchBar,
  args: { onClick: fn() },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
  render: () => <SearchBar />,
};
