import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Styles/Visual elements",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colour = {
  render: () => (
    <div>
      <h1 className="heading-l">Colour</h1>
    </div>
  ),
} satisfies Story;

export const Images = {
  render: () => (
    <div>
      <h1 className="heading-l">Images</h1>
    </div>
  ),
} satisfies Story;
