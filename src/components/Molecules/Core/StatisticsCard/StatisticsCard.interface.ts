import type { Asset } from "@src/types/Asset";
import type { Reference } from "@src/types/Reference";

export interface StatisticsCardProps {
  _uid: string;
  title: string;
  subTitle: string;
  // Reference needs to be array here even if we have a single reference due to the way Storyblok
  //  blocks work
  reference: Reference[];
  image: Asset;
}
