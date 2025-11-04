import { useState, type FC } from "react";
import clsx from "clsx";

import styles from "./NavBar.module.scss";

import { Image } from "@components/Molecules/Core/Image/Image";
import { Link } from "@components/Molecules/Core/Link/Link";
import { SearchBar } from "@components/Molecules/SearchBar/SearchBar";
import { Icon } from "@components/Molecules/Core/Icon/Icon";
import { MegaMenu } from "@/src/components/MegaMenu/MegaMenu";

import type { MegaMenu as MegaMenuData } from "@localTypes/MegaMenu";
import type { ExpandableItem, NavBarProps } from "./NavBar.interface";

const NavBarItem: FC<ExpandableItem> = (props) => {
  const isOpen = props.openId === props._uid;
  const iconName = isOpen ? "RiArrowDownSLine" : "RiArrowUpSLine";

  return (
    <button
      className={clsx(
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "gap-1",
        styles["navbar-item-button"],
      )}
      onClick={props.onClick}
    >
      <p className="m-0">{props.label}</p>
      <Icon iconName={iconName} />
    </button>
  );
};

export const NavBar: FC<NavBarProps> = (props) => {
  const hasExpandableItems =
    props.expandableItems && props.expandableItems.length > 0;
  const hasLinks = props.links && props.links.length > 0;

  const [openId, setOpenId] = useState<string | null>(null);
  const [megaMenuData, setMegaMenuData] = useState<MegaMenuData | null>(null);

  function toggleNavBarItem(expandableItem: ExpandableItem) {
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
        <div className={clsx("container-lg", "p-2")}>
          <div
            className={clsx(
              "d-flex",
              "align-items-center",
              "justify-content-between",
              "gap-4",
            )}
          >
            {/* Logo */}
            <Image {...props.logo} />

            {/* Nav Items */}
            {hasExpandableItems &&
              props.expandableItems.map((expandableItem) => (
                <div key={expandableItem._uid}>
                  {/* Nav Item label */}
                  <NavBarItem
                    {...expandableItem}
                    onClick={() => toggleNavBarItem(expandableItem)}
                    openId={openId}
                  />
                  {/* Nav Item Overview */}
                  {/* {navItem.overview && <TextModule richText={navItem.overview} />} */}
                </div>
              ))}

            {/* Nav Links */}
            {hasLinks &&
              props.links.map((navBarLink) => (
                <Link
                  key={navBarLink._uid}
                  {...navBarLink.link}
                  label={navBarLink.label}
                  textInverse={true}
                />
              ))}

            {/* SearchBar */}
            <SearchBar placeholder="TODO searchBar" />
          </div>
        </div>
      </nav>
      <div className={clsx(styles["desktop-mega-menu"], "w-100")}>
        {megaMenuData && <MegaMenu {...megaMenuData} />}
      </div>
    </>
  );
};
