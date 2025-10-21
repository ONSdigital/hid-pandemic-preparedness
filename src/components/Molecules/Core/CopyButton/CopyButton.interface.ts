import type { RefObject } from "react";

export interface CopyButtonProps {
  contentElement: RefObject<HTMLElement | null>;
  className?: string;
}
