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
      <p>The default font used for all content is Open Sans.</p>
      <h2 className="heading-m">Code formatting</h2>
      <p>
        The font used for all source code content is Courier New, e.g.{" "}
        <code className="inline">Here is an inline code snippet</code>.
      </p>
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
      <p className="body">The default paragraph font size is 1.25rem (20px).</p>
    </div>
  ),
} satisfies Story;

export const ListsStory = {
  name: "Lists",
  render: () => (
    <div>
      <h1 className="heading-l">Lists</h1>
    </div>
  ),
} satisfies Story;

export const FontOverrideClassesStory = {
  name: "Font override classes",
  render: () => (
    <div>
      <h1 className="heading-l">Font override classes</h1>
    </div>
  ),
} satisfies Story;
