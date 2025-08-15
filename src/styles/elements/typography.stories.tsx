import type { Meta, StoryObj } from "@storybook/react";
import "./_typography.scss";

const meta = {
  title: "Typography/Headings",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings = {
  render: () => (
    <div style={{ padding: "1rem" }}>
      <h1 className="heading-xl">Heading XL - The quick brown fox</h1>
      <h2 className="heading-l">Heading L - Jumps over the lazy dog</h2>
      <h3 className="heading-m">Heading M - Lorem ipsum dolor sit amet</h3>
      <h4 className="heading-s">Heading S - Consectetur adipiscing elit</h4>
    </div>
  ),
} satisfies Story;
