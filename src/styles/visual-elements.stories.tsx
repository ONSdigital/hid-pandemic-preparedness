import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
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
const ColorSwatch: FC<ColorSwatchProps> = ({
  backgroundColorVar,
  inverseText = false,
}) => {
  const backgroundColorValue = `var(${backgroundColorVar})`;
  const textColorValue = inverseText ? "var(--color-text-inverse)" : undefined;
  const ref = useRef(null);
  const [resolvedColorHex, setResolvedColorHex] = useState("");

  // Evaluates the actual hex value of the input `backgroundColorVar` once rendered so we can
  // display it in the component
  useEffect(() => {
    if (ref.current && backgroundColorVar) {
      const styles = getComputedStyle(ref.current);
      const value = styles.getPropertyValue(backgroundColorVar).trim();
      setResolvedColorHex(value);
    }
  }, [backgroundColorVar]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: backgroundColorValue,
        border: "solid",
        borderColor: "var(--color-text-default)",
        borderRadius: "var(--corner-radius-default)",
        borderWidth: "1px",
        color: textColorValue,
        display: "flex",
        marginTop: "var(--spacing-2)",
        padding: "var(--spacing-1)",
        paddingLeft: "var(--spacing-3)",
        paddingRight: "var(--spacing-3)",
      }}
    >
      <div style={{ marginRight: "auto" }}>
        <code>{backgroundColorVar}</code>
      </div>
      <div>
        <code>{resolvedColorHex}</code>
      </div>
    </div>
  );
};

export const ColoursStory = {
  name: "Colours",
  render: () => (
    <div>
      <h1 className="heading-l">Colours</h1>
      <h2 className="heading-m">Text</h2>
      <ColorSwatch backgroundColorVar="--color-text-default" inverseText />
      <ColorSwatch backgroundColorVar="--color-text-inverse" />
      <ColorSwatch backgroundColorVar="--color-text-accent" inverseText />
      <hr />
      <h2 className="heading-m">Surface</h2>
      <ColorSwatch backgroundColorVar="--color-surface-default" />
      <ColorSwatch backgroundColorVar="--color-surface-subtle" />
      <ColorSwatch backgroundColorVar="--color-surface-subtle-alt" />
      <ColorSwatch backgroundColorVar="--color-surface-inverse" inverseText />
      <hr />
      <h2 className="heading-m">Brand</h2>
      <ColorSwatch
        backgroundColorVar="--color-brand-primary-default"
        inverseText
      />
      <ColorSwatch backgroundColorVar="--color-brand-secondary-default" />
      <hr />
    </div>
  ),
} satisfies Story;

export const ImagesStory = {
  name: "Images",
  render: () => (
    <div>
      <h1 className="heading-l">Images</h1>
    </div>
  ),
} satisfies Story;
