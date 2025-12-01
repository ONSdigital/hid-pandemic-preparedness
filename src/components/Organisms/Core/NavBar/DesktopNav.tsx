import type { FC } from "react";
import clsx from "clsx";

import { Link } from "@components/Molecules/Core/Link/Link";
import { Icon } from "@components/Molecules/Core/Icon/Icon";
import { Image } from "@components/Molecules/Core/Image/Image";
import { Button } from "@src/components/Button/Button";
import { RiSearchLine, RiCloseLine } from "@remixicon/react";

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
        "align-items-stretch",
        "justify-content-between",
        "gap-4",
        styles["navbar-height"],
      )}
    >
      {/* Logo */}
      <a
        href="/"
        aria-label="Redirect to homepage"
        className={clsx("d-flex", "align-items-center")}
      >
        <Image {...props.logo} className={styles["navbar-logo"]} />
      </a>

      {hasExpandableItems &&
        props.expandableItems.map((expandableItem) => {
          const isOpen = props.openItemId === expandableItem._uid;
          const iconName = isOpen ? "RiArrowUpSLine" : "RiArrowDownSLine"; // When expanded, the arrow icon direction will point down
          return (
            <div
              className={clsx(
                "d-flex",
                "justify-content-center",
                "align-items-center",
                styles["nav-border-bottom"],
                isOpen && styles["nav-item-selected"],
              )}
            >
              <button
                aria-controls={`mega-menu-${expandableItem._uid}`}
                aria-expanded={isOpen}
                aria-label="Toggle nav bar expandable item"
                key={expandableItem._uid}
                onClick={() => props.onClick(expandableItem)}
                className={clsx(
                  "d-flex",
                  "justify-content-center",
                  "align-items-center",
                  "gap-1",
                  styles["navbar-button"],
                  styles["nav-item"],
                )}
              >
                <p className="m-0">{expandableItem.label}</p>
                <Icon iconName={iconName} className={styles["navbar-icon"]} />
              </button>
            </div>
          );
        })}

      {hasLinks &&
        props.links.map((navBarLink) => (
          <div
            className={clsx(
              "d-flex",
              "justify-content-center",
              "align-items-center",
              styles["nav-border-bottom"],
            )}
          >
            <Link
              key={navBarLink._uid}
              {...navBarLink.link}
              label={navBarLink.label}
              textInverse={true}
              hideIcon={true}
              className={clsx(
                "d-flex",
                "align-items-center",
                styles["nav-item"],
              )}
            />
          </div>
        ))}

      <div
        className={clsx(
          "d-flex",
          "align-items-center",
          styles["nav-item"],
          styles["nav-border-bottom"],
        )}
      >
        <Button
          type="button"
          variant="primary"
          className="text-white"
          ariaLabel={props.isSearchOpen ? "Close search" : "Open search"}
          onClick={props.onSearchToggle}
        >
          {props.isSearchOpen ? <RiCloseLine /> : <RiSearchLine />}
        </Button>
      </div>
    </div>
  );
};
