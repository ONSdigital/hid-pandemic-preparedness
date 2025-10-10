import type { ImpactCardProps } from "@/src/components/Molecules/Home/ImpactCard/ImpactCard.interface";

export interface ImpactProps {
  _uid: string;
  title: string;
  cards: ImpactCardProps[];
}
