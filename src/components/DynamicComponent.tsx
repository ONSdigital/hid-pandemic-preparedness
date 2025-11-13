import type { FC } from "react";

import { CaseStudies } from "@src/components/Organisms/Home/CaseStudies/CaseStudies";
import { Header } from "@src/components/Organisms/Home/Header/Header";
import { FullWidthRichText } from "@src/components/Organisms/Core/FullWidthRichText/FullWidthRichText";
import { ImageAndText } from "@src/components/Organisms/Home/ImageAndText/ImageAndText";
import { Impact } from "@src/components/Organisms/Home/Impact/Impact";
import { StatisticsAndText } from "@src/components/Organisms/Home/StatisticsAndText/StatisticsAndText";
import { StrategicPartners } from "@src/components/Organisms/Home/StrategicPartners/StrategicPartners";
import { ToolsCarousel } from "@src/components/Organisms/Home/ToolsCarousel/ToolsCarousel";
import { QuickLinks } from "@/src/components/Organisms/Home/QuickLinks/QuickLinks";
import { UnitChapter } from "@src/components/Organisms/Unit/UnitChapter/UnitChapter";
import { UnitOverview } from "@/src/components/Organisms/Unit/UnitOverview/UnitOverview";
import { Iframe } from "@/src/components/Organisms/Core/Iframe/Iframe";
import { Video } from "@/src/components/Organisms/Core/Video/Video";

// List of components that we have corresponding bloks for in Storyblok
type ComponentName =
  | "ToolsCarousel"
  | "CaseStudies"
  | "FullWidthRichText"
  | "Header"
  | "ImageAndText"
  | "Impact"
  | "StatisticsAndText"
  | "StrategicPartners"
  | "QuickLinks"
  | "UnitChapter"
  | "UnitOverview"
  | "Iframe"
  | "Video";

const COMPONENT_MAP: Record<ComponentName, FC<any>> = {
  CaseStudies,
  FullWidthRichText,
  Header,
  ImageAndText,
  Impact,
  StatisticsAndText,
  StrategicPartners,
  ToolsCarousel,
  QuickLinks,
  UnitChapter,
  UnitOverview,
  Iframe,
  Video,
};

interface DynamicComponentProps {
  blok: any;
}

// Component allows us to dynamically load a component based on the value of the input
// `component` prop
export const DynamicComponent: FC<DynamicComponentProps> = ({ blok }) => {
  const component: string = blok.component;

  // If we are trying to render a blok we don't have a corresponding component for, raise error
  if (!Object.keys(COMPONENT_MAP).includes(component)) {
    console.warn(
      `DynamicComponent warning: Component "${component}" not found in COMPONENT_MAP.`,
    );
    return null;
  }
  const Component = COMPONENT_MAP[component as ComponentName];

  // Spread blok properties as props
  return <Component key={blok._uid} {...blok} />;
};
