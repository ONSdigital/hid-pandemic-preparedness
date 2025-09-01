export interface ArrowButtonProps {
  ariaLabel: string;
  disabled?: boolean;
  selected?: boolean;
  type: "button" | "submit" | "reset";
  variant: "primary" | "primary-inverse";
}
