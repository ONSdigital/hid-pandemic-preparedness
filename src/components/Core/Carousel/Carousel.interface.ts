import type { ReactNode } from "react";

import type { CardToolProps } from "@components/CardTool/CardTool.interface";
import type { CardUnitProps } from "@components/CardUnit/CardUnit.interface";

export type CarouselItemType = "CardTool" | "CardUnit" | "ReactNode";

export interface CarouselProps {
  type: CarouselItemType;
  items: CardToolProps[] | CardUnitProps[] | ReactNode[];
  itemsPerView?: number;
  showNavigation?: boolean;
  className?: string;
  callToAction?: null | {
    label: string;
    href: string;
  };
  title?: string;
  subtitle?: string;
}
