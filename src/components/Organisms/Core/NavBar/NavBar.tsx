import { useState, type FC } from "react";
import clsx from "clsx";

import styles from "./NavBar.module.scss";
import type { NavBarProps, NavItem } from "./NavBar.interface";
import type { MegaMenuProps } from "@components/MegaMenu/MegaMenu.interface";

import { Image } from "@components/Molecules/Core/Image/Image";
import { Link } from "@components/Molecules/Core/Link/Link";
import { SearchBar } from "@components/Molecules/SearchBar/SearchBar";
import { Icon } from "@components/Molecules/Core/Icon/Icon";

const NavBarItem: FC<NavItem> = (props) => {
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
  const hasNavItems = props.navItems && props.navItems.length > 0;
  const hasNavLinks = props.navLinks && props.navLinks.length > 0;

  const [openId, setOpenId] = useState<string | null>(null);

  const megaMenuData = useState<MegaMenuProps | null>(null);

  function toggleNavBarItem(navItem: NavItem) {
    console.log("nav item clicked", navItem.label);

    if (navItem._uid === openId) {
      setOpenId(null);
    } else {
      setOpenId(navItem._uid);
    }
  }

  return (
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
          {hasNavItems &&
            props.navItems.map((navItem) => (
              <div key={navItem._uid}>
                {/* Nav Item label */}
                <NavBarItem
                  {...navItem}
                  onClick={() => toggleNavBarItem(navItem)}
                  openId={openId}
                />
                {/* Nav Item Overview */}
                {/* {navItem.overview && <TextModule richText={navItem.overview} />} */}
              </div>
            ))}

          {/* Nav Links */}
          {hasNavLinks &&
            props.navLinks.map((navLink) => (
              <Link key={navLink._uid} {...navLink.link} textInverse={true} />
            ))}

          {/* SearchBar */}
          <SearchBar placeholder="TODO searchBar" />
        </div>
      </div>
    </nav>
  );
};
