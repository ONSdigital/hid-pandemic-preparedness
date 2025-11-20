import type { Asset } from "@localTypes/Asset";
import type { LinkComponent } from "@localTypes/LinkComponent";
import type { MegaMenu } from "@localTypes/MegaMenu";
import type { Accordions } from "@localTypes/Accordions";

export interface NavBarProps {
  logo: Asset;
  expandableItems: ExpandableItemData[];
  links: LinkComponent[];
}

export interface ExpandableItemData {
  _uid: string;
  label: string;
  MegaMenu: MegaMenu[];
}

export interface DesktopNavProps extends NavBarProps {
  onClick: (item: ExpandableItemData) => any; // eslint-disable-line no-unused-vars
  openItemId: string | null;
}

export interface MobileNavProps extends NavBarProps {
  onClick: () => any;
  isOpen: boolean;
}

export interface NavAccordionsProps extends Accordions {}
