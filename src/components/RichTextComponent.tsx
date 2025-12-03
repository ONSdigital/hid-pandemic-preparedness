import type { FC } from "react";

import { Formula } from "@src/components/Molecules/Core/Formula/Formula";
import { Table } from "@src/components/Molecules/Core/Table/Table";
import { Tip } from "@src/components/Molecules/Core/Tip/Tip";
import { Video } from "@src/components/Organisms/Core/Video/Video";
import { Iframe } from "@src/components/Organisms/Core/Iframe/Iframe";

// List of components that we have corresponding bloks for in Storyblok
type ComponentName = "Formula" | "Table" | "Tip" | "Video" | "Iframe";

const COMPONENT_MAP: Record<ComponentName, FC<any>> = {
  Formula,
  Table,
  Tip,
  Video,
  Iframe,
};

interface DynamicComponentProps {
  blok: any;
}

// Component allows us to dynamically load a component based on the value of the input
// `component` prop
export const RichTextComponent: FC<DynamicComponentProps> = ({ blok }) => {
  const component: string = blok.component;

  // If we are trying to render a blok we don't have a corresponding component for, raise error
  if (!Object.keys(COMPONENT_MAP).includes(component)) {
    console.warn(
      `RichTextComponent warning: Component "${component}" not found in COMPONENT_MAP.`,
    );
    return null;
  }
  const Component = COMPONENT_MAP[component as ComponentName];

  // Spread blok properties as props
  return <Component key={blok._uid} {...blok} />;
};
