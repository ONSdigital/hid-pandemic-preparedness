import type { FC } from "react";
import clsx from "clsx";

import { Link } from "@components/Molecules/Core/Link/Link";
import { SearchBar } from "@components/Molecules/SearchBar/SearchBar";
import { Icon } from "@components/Molecules/Core/Icon/Icon";
import { Image } from "@components/Molecules/Core/Image/Image";

import styles from "./NavBar.module.scss";
import type { DesktopNavProps } from "./NavBar.interface";

export const DesktopNav: FC<DesktopNavProps> = (props) => {
  const hasExpandableItems =
    props.expandableItems && props.expandableItems.length > 0;
  const hasLinks = props.links && props.links.length > 0;

  return (
    <div
      className={clsx(
        "d-flex",
        "align-items-center",
        "justify-content-between",
        "gap-4",
        styles["navbar-height"],
      )}
    >
      {/* Logo */}
      <Image {...props.logo} className={styles["navbar-logo"]} />

      {hasExpandableItems &&
        props.expandableItems.map((expandableItem) => {
          const isOpen = props.openItemId === expandableItem._uid;
          const iconName = isOpen ? "RiArrowDownSLine" : "RiArrowUpSLine"; // When expanded, the arrow icon direction will point down
          return (
            <button
              key={expandableItem._uid}
              onClick={() => props.onClick(expandableItem)}
              className={clsx(
                "d-flex",
                "justify-content-center",
                "align-items-center",
                "gap-1",
                styles["navbar-icon-button"],
              )}
            >
              <p className="m-0">{expandableItem.label}</p>
              <Icon iconName={iconName} className={styles["navbar-logo"]} />
            </button>
          );
        })}

      {hasLinks &&
        props.links.map((navBarLink) => (
          <Link
            key={navBarLink._uid}
            {...navBarLink.link}
            label={navBarLink.label}
            textInverse={true}
            hideIcon={true}
          />
        ))}

      <SearchBar placeholder="TODO searchBar" />
    </div>
  );
};
