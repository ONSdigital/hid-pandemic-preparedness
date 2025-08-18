import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Styles/Page structure",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageTemplate = {
  name: "Page template",
  render: () => (
    <div>
      <h1 className="heading-l">Page template</h1>
    </div>
  ),
} satisfies Story;

export const Layout = {
  name: "Layout",
  render: () => (
    <div>
      <h1 className="heading-l">Layout</h1>
    </div>
  ),
} satisfies Story;

export const Spacing = {
  name: "Spacing",
  render: () => (
    <div>
      <h1 className="heading-l">Spacing</h1>
    </div>
  ),
} satisfies Story;

export const SectionBreak = {
  name: "Section break",
  render: () => (
    <div>
      <h1 className="heading-l">Section break</h1>
    </div>
  ),
} satisfies Story;
