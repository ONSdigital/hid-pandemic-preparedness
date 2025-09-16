import type { MouseEventHandler, ReactNode } from "react";

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
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
