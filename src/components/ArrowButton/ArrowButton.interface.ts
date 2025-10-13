export interface ArrowButtonProps {
  ariaLabel: string;
  disabled?: boolean;
  direction: "left" | "right";
  onClick?: (...args: any[]) => any;
  selected?: boolean;
  type: "button" | "submit" | "reset";
  variant: "primary" | "secondary";
}
