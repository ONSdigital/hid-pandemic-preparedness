import type { ReferenceData } from "@/src/types/ReferenceData";

export interface ReferenceItemProps extends ReferenceData {}

export interface ReferencesProps {
  references?: ReferenceData[];
}
