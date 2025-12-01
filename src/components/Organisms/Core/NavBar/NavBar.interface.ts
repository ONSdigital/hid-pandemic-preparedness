import type { Asset } from "@src/types/Asset";
import type { LinkComponent } from "@src/types/LinkComponent";
import type { MegaMenu } from "@src/types/MegaMenu";
import type { Accordions } from "@src/types/Accordions";

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
  onSearchToggle: () => void;
  isSearchOpen: boolean;
}

export interface MobileNavProps extends NavBarProps {
  onClick: () => any;
  isOpen: boolean;
}

export interface NavAccordionsProps extends Accordions {}
