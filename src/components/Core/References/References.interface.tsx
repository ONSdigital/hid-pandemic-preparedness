import type { ReferenceData } from "../../types/ReferenceData";

export interface ReferenceItemProps extends ReferenceData {}

export interface ReferencesProps {
  references?: ReferenceData[];
}
