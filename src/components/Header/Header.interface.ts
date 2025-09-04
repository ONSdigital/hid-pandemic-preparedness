import type { ReactNode } from "react";

export interface HeaderProps {
  children: ReactNode;
  description: string;
  heading: string;
  subheading: string;
}
