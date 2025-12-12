import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  ariaLabel: string;
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  type: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "inverse" | "link";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
