import type { ReferenceData } from "@localTypes/ReferenceData";

export interface ReferenceItemProps extends ReferenceData {}

export interface ReferencesProps {
  references?: ReferenceData[];
}
