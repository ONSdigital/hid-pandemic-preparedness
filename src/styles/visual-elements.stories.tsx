import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Styles/Visual elements",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface ColorSwatchProps {
  backgroundColorVar: string;
  inverseText?: boolean;
}

// React component to show colours
const ColorSwatch: React.FC<ColorSwatchProps> = ({
  backgroundColorVar,
  inverseText = false,
}) => {
  const backgroundColorValue = `var(${backgroundColorVar})`;
  const textColorValue = inverseText ? "var(--color-text-inverse)" : undefined;

  return (
    <p
      style={{
        backgroundColor: backgroundColorValue,
        border: "solid",
        borderColor: "var(--color-text-default)",
        borderRadius: "var(--corner-radius-default)",
        borderWidth: "1px",
        color: textColorValue,
        padding: "2px",
        paddingLeft: "8px",
      }}
    >
      <code>{backgroundColorVar}</code>
    </p>
  );
};

export const Colour = {
  name: "Colour",
  render: () => (
    <div>
      <h1 className="heading-l">Colour</h1>
      <h2 className="heading-s">Text</h2>
      <ColorSwatch backgroundColorVar="--color-text-default" inverseText />
      <ColorSwatch backgroundColorVar="--color-text-inverse" />
      <ColorSwatch backgroundColorVar="--color-text-accent" inverseText />
      <hr />
      <h2 className="heading-s">Surface</h2>
      <ColorSwatch backgroundColorVar="--color-surface-default" />
      <ColorSwatch backgroundColorVar="--color-surface-subtle" />
      <ColorSwatch backgroundColorVar="--color-surface-subtle-alt" />
      <ColorSwatch backgroundColorVar="--color-surface-inverse" inverseText />
      <hr />
      <h2 className="heading-s">Brand</h2>
      <ColorSwatch
        backgroundColorVar="--color-brand-primary-default"
        inverseText
      />
      <ColorSwatch backgroundColorVar="--color-brand-secondary-default" />
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
