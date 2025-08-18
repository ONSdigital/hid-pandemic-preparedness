import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Styles/Visual elements",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colour = {
  name: "Colour",
  render: () => (
    <div>
      <h1 className="heading-l">Colour</h1>
      <h2 className="heading-s">Text</h2>
      <p
        style={{
          backgroundColor: "var(--text-default)",
          color: "var(--text-inverse)",
        }}
      >
        --text-default
      </p>
      <p
        style={{
          backgroundColor: "var(--text-inverse)",
        }}
      >
        --text-inverse
      </p>
      <p
        style={{
          backgroundColor: "var(--text-accent)",
          color: "var(--text-inverse)",
        }}
      >
        --text-accent
      </p>
      <hr />
      <h2 className="heading-s">Surface</h2>
      <p
        style={{
          backgroundColor: "var(--surface-default)",
        }}
      >
        --surface-default
      </p>
      <p
        style={{
          backgroundColor: "var(--surface-subtle)",
        }}
      >
        --surface-subtle
      </p>
      <p
        style={{
          backgroundColor: "var(--surface-subtle-alt)",
        }}
      >
        --surface-subtle-alt
      </p>
      <p
        style={{
          backgroundColor: "var(--surface-inverse)",
          color: "var(--text-inverse)",
        }}
      >
        --surface-inverse
      </p>
      <hr />
      <h2 className="heading-s">Brand</h2>
      <hr />
    </div>
  ),
} satisfies Story;

export const Images = {
  name: "Images",
  render: () => (
    <div>
      <h1 className="heading-l">Images</h1>
    </div>
  ),
} satisfies Story;
