import { useState, type FC } from "react";
import clsx from "clsx";

import { MegaMenu } from "@/src/components/MegaMenu/MegaMenu";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

import type { MegaMenu as MegaMenuData } from "@localTypes/MegaMenu";
import type { ExpandableItemData, NavBarProps } from "./NavBar.interface";
import styles from "./NavBar.module.scss";

export const NavBar: FC<NavBarProps> = (props) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [megaMenuData, setMegaMenuData] = useState<MegaMenuData | null>(null);

  function toggleExpandableItem(expandableItem: ExpandableItemData) {
    if (expandableItem._uid === openId) {
      setOpenId(null);
      setMegaMenuData(null);
    } else {
      setOpenId(expandableItem._uid);
      setMegaMenuData(expandableItem.MegaMenu[0]);
    }
  }

  return (
    <>
      <nav className={clsx("w-100", styles["navbar-bg"])}>
        <div className={clsx("container-lg")}>
          {/* Desktop Nav */}

          <div className="d-none d-lg-block">
            <DesktopNav
              {...props}
              openItemId={openId}
              onClick={toggleExpandableItem}
            />
          </div>
          {/* Mobile Nav */}
          <div className="d-lg-none">
            <MobileNav {...props} />
          </div>
        </div>
      </nav>
      <div className={clsx(styles["desktop-mega-menu"], "w-100")}>
        {megaMenuData && <MegaMenu {...megaMenuData} />}
      </div>
    </>
  );
};
