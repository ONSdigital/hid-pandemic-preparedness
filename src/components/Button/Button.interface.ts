import type { ComponentType } from "react";

export interface ButtonProps {
  ariaLabel: string;
  children: ComponentType;
  disabled?: boolean;
  selected?: boolean;
  type: "button" | "submit" | "reset";
  variant: "primary" | "primary-inverse" | "secondary" | "secondary-inverse";
}
