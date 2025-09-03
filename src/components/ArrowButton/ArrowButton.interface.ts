export interface ArrowButtonProps {
  ariaLabel: string;
  disabled?: boolean;
  direction: "left" | "right";
  selected?: boolean;
  type: "button" | "submit" | "reset";
  variant: "primary" | "primary-inverse";
}
