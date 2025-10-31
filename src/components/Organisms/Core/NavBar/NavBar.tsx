import type { FC } from "react";

import type { NavBarProps } from "./NavBar.interface";
import { Image } from "@components/Molecules/Core/Image/Image";
import { Link } from "@components/Molecules/Core/Link/Link";
import { SearchBar } from "@components/Molecules/SearchBar/SearchBar";

export const NavBar: FC<NavBarProps> = (props) => {
  const hasNavItems = props.navItems && props.navItems.length > 0;
  const hasNavLinks = props.navLinks && props.navLinks.length > 0;
  return (
    <>
      {/* Logo */}
      <Image {...props.logo} />

      {/* Nav Items */}
      {hasNavItems &&
        props.navItems.map((navItem) => (
          <div key={navItem._uid}>
            {/* Nav Item label */}
            <h1> {navItem.label}</h1>
            {/* Nav Item Overview */}
            {/* {navItem.overview && <TextModule richText={navItem.overview} />} */}
          </div>
        ))}

      {/* Nav Links */}
      {hasNavLinks &&
        props.navLinks.map((navLink) => (
          <Link key={navLink._uid} {...navLink.link} />
        ))}

      {/* SearchBar */}
      <SearchBar placeholder="TODO searchBar" />
    </>
  );
};
