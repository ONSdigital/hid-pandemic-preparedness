import type { Asset } from "@localTypes/Asset";
import type { Link } from "@localTypes/Link";
import type { MegaMenu } from "@localTypes/MegaMenu";

export interface NavBarProps {
  logo: Asset;
  expandableItems: ExpandableItem[];
  links: Link[];
}

export interface ExpandableItem extends MegaMenu {
  label: string;
  onClick?: () => any;
  openId?: string | null;
}
