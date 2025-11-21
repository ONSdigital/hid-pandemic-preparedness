import type { ReactNode } from "react";

interface AccordionItem {
  id: string;
  headerTitle: string;
  bodyContent: ReactNode;
}

export interface Accordions {
  items: AccordionItem[];
}
