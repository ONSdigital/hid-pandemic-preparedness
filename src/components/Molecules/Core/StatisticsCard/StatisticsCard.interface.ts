import type { Asset } from "@src/types/Asset";
import type { Reference } from "@src/types/Reference";

export interface StatisticsCardProps {
  _uid: string;
  title: string;
  subTitle: string;
  reference: Reference;
  image: Asset;
}
