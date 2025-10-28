import type { ReferenceData } from "@localTypes/ReferenceData";

export interface ReferenceItemProps extends ReferenceData {}

// Props for the Reference wrapper component (optional extra props)
export interface ReferenceProps extends ReferenceData {
  label?: string;
}
