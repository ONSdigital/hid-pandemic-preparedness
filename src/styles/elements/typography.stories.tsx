import type { Meta, StoryObj } from "@storybook/react";
import "./_typography.scss";

const meta = {
  title: "Elements/Typography",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typography = {
  render: () => (
    <div>
      <h1 className="heading-xl">Heading-xl example</h1>
      <h1 className="heading-l">Heading-l example</h1>
      <h1 className="heading-m">Heading-m example</h1>
      <h1 className="heading-s">Heading-xl example</h1>
    </div>
  ),
} satisfies Story;
