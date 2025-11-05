import type { Asset } from "@localTypes/Asset";
import type { Link } from "@localTypes/Link";
import type { MegaMenu } from "@localTypes/MegaMenu";

export interface NavBarProps {
  logo: Asset;
  expandableItems: ExpandableItemData[];
  links: Link[];
}

export interface ExpandableItemData {
  _uid: string;
  label: string;
  MegaMenu: MegaMenu[];
}

export interface DesktopNavProps {
  expandableItems: ExpandableItemData[];
  links: Link[];
  onClick: (item: ExpandableItemData) => any;
  openItemId: string | null;
}
