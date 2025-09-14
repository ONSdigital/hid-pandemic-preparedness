export interface ImpactData {
  icon: "countries" | "experts" | "users";
  title: string;
  subTitle: string;
}

export interface ImpactAndPartnersProps {
  impactTitle: string;
  partnersTitle: string;
  impactItems: ImpactData[];
}
