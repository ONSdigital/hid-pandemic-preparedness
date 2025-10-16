import type { RefObject } from "react";

export interface CopyButtonProps {
  contentElement: RefObject<HTMLInputElement | null>;
  className?: string;
}
