import type { MouseEventHandler } from "react";

export interface ArrowButtonProps {
  ariaLabel: string;
  disabled?: boolean;
  direction: "left" | "right";
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit" | "reset";
  variant: "primary" | "primary-inverse";
}
