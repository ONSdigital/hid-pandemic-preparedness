import type { LinkData } from "../../../types/LinkData";

export interface ImpactData {
  id: string;
  icon: "countries" | "experts" | "users";
  title: string;
  subTitle: string;
}

export interface PartnerData {
  id: string;
  imgSrcPath: string;
  link: LinkData;
}

export interface ImpactAndPartnersProps {
  impactTitle: string;
  impactItems: ImpactData[];
  partnersTitle: string;
  partnerItems: PartnerData[];
}
