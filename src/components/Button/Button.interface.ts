import type { ReactNode } from "react";

export interface ButtonProps {
  ariaLabel: string;
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  type: "button" | "submit" | "reset";
  variant:
    | "primary"
    | "primary-inverse"
    | "secondary"
    | "secondary-inverse"
    | "search-bar";
}

export interface ButtonArrowProps {
  ariaLabel: string;
  disabled?: boolean;
  direction: "left" | "right";
  selected?: boolean;
  type: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
}
