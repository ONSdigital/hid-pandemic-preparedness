import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Styles/Page structure",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageTemplate = {
  render: () => (
    <div>
      <h1 className="heading-l">Page template</h1>
    </div>
  ),
} satisfies Story;

export const Layout = {
  render: () => (
    <div>
      <h1 className="heading-l">Layout</h1>
    </div>
  ),
} satisfies Story;

export const Spacing = {
  render: () => (
    <div>
      <h1 className="heading-l">Spacing</h1>
    </div>
  ),
} satisfies Story;

export const SectionBreak = {
  render: () => (
    <div>
      <h1 className="heading-l">Section break</h1>
    </div>
  ),
} satisfies Story;
