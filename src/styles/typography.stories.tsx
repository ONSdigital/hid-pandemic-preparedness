import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Styles/Typography",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typeface = {
  name: "Typeface",
  render: () => (
    <div>
      <h1 className="heading-l">Typeface</h1>
    </div>
  ),
} satisfies Story;

export const TypeScale = {
  name: "Type scale",
  render: () => (
    <div>
      <h1 className="heading-l">Type scale</h1>
    </div>
  ),
} satisfies Story;

export const Headings = {
  name: "Headings",
  render: () => (
    <div>
      <h1 className="heading-l">Headings</h1>
      <p className="body">
        All interface elements consist of the following typographic styles.
      </p>
      <p className="body">
        Note: Rem values are based on a root font size of 16px.
      </p>
      <h1 className="heading-xl">heading-xl</h1>
      <hr />
      <h1 className="heading-l">heading-l</h1>
      <hr />
      <h1 className="heading-m">heading-m</h1>
      <hr />
      <h1 className="heading-s">heading-s</h1>
      <hr />
    </div>
  ),
} satisfies Story;

export const Paragraphs = {
  name: "Paragraphs",
  render: () => (
    <div>
      <h1 className="heading-l">Paragraphs</h1>
    </div>
  ),
} satisfies Story;

export const Links = {
  name: "Links",
  render: () => (
    <div>
      <h1 className="heading-l">Links</h1>
    </div>
  ),
} satisfies Story;

export const Lists = {
  name: "Lists",
  render: () => (
    <div>
      <h1 className="heading-l">Lists</h1>
    </div>
  ),
} satisfies Story;

export const FontOverrideClasses = {
  name: "Font override classes",
  render: () => (
    <div>
      <h1 className="heading-l">Font override classes</h1>
    </div>
  ),
} satisfies Story;
