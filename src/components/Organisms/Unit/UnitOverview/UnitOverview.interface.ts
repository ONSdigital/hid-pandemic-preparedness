import type { Tag } from "@src/types/Tag";
import type { UnitOverview } from "@src/types/bloks/storyblok-components";

export interface UnitOverviewProps extends UnitOverview {
  tags?: Tag[];
  // Prop for handling button click to increment chapter
  onNext: () => void;
}
