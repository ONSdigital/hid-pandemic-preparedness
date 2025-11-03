import type { Asset } from "@localTypes/Asset";
import type { Link } from "@localTypes/Link";
import type { MegaMenu } from "@localTypes/MegaMenu";

export interface NavBarProps {
  logo: Asset;
  expandableItems: ExpandableItem[];
  links: Link[];
}

export interface ExpandableItem {
  _uid: string;
  label: string;
  MegaMenu: MegaMenu[];
  onClick?: () => any;
  openId?: string | null;
}
