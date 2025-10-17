import type { FC } from "react";

import { Carousel } from "@/src/components/Organisms/Core/Carousel/Carousel";
import { CaseStudies } from "@components/Organisms/Home/CaseStudies/CaseStudies";
import { Header } from "@components/Organisms/Home/Header/Header";
import { ImageAndText } from "@components/Organisms/Home/ImageAndText/ImageAndText";
import { Impact } from "@components/Organisms/Home/Impact/Impact";
import { StatisticsAndText } from "@components/Organisms/Home/StatisticsAndText/StatisticsAndText";
import { StrategicPartners } from "@components/Organisms/Home/StrategicPartners/StrategicPartners";

// List of components that we have corresponding bloks for in Storyblok
type ComponentName =
  | "Carousel"
  | "CaseStudies"
  | "Header"
  | "ImageAndText"
  | "Impact"
  | "StatisticsAndText"
  | "StrategicPartners";

const COMPONENT_MAP: Record<ComponentName, FC<any>> = {
  Carousel,
  CaseStudies,
  Header,
  ImageAndText,
  Impact,
  StatisticsAndText,
  StrategicPartners,
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
    throw new Error(
      `DynamicComponent error: Component "${component}" not found in COMPONENT_MAP.`,
    );
  }
  const Component = COMPONENT_MAP[component as ComponentName];

  // Spread blok properties as props
  return <Component key={blok._uid} {...blok} />;
};
