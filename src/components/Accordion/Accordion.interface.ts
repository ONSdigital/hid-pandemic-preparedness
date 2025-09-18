import type { ReactNode } from "react";

export interface AccordionItem {
  id: string;
  headerTitle: string;
  bodyContent: ReactNode;
}

export interface AccordionProps {
  id: string;
  items: AccordionItem[];
  variant?: "primary";
}
