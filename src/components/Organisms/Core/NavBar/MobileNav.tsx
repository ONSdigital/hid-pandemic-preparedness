import type { FC } from "react";
import clsx from "clsx";

import { Image } from "@components/Molecules/Core/Image/Image";
import { MegaMenu } from "@components/MegaMenu/MegaMenu";
import { Link } from "@components/Molecules/Core/Link/Link";
import { Icon } from "@components/Molecules/Core/Icon/Icon";

import type { NavAccordionsProps, MobileNavProps } from "./NavBar.interface";
import styles from "./NavBar.module.scss";
import { SearchBar } from "@/src/components/Molecules/SearchBar/SearchBar";
import strings from "@src/content/strings.json";

export const MobileNav: FC<MobileNavProps> = (props) => {
  const hasExpandableItems =
    props.expandableItems && props.expandableItems.length > 0;
  const hasLinks = props.links && props.links.length > 0;

  const accordionItems = hasExpandableItems
    ? props.expandableItems.map((expandableItem) => ({
        id: expandableItem._uid,
        headerTitle: expandableItem.label,
        bodyContent: <MegaMenu {...expandableItem.MegaMenu[0]} />,
      }))
    : [];

  const iconName = props.isOpen ? "RiCloseFill" : "RiMenuFill";

  return (
    <div className="w-100">
      {/* Logo with hamburger menu */}
      <div
        className={clsx(
          "d-flex",
          "align-items-stretch",
          "justify-content-between",
          styles["navbar-height"],
        )}
      >
        <a
          href="/"
          aria-label="Redirect to homepage"
          className={clsx("d-flex", "align-items-center")}
        >
          <Image {...props.logo} className={styles["navbar-logo"]} />
        </a>

        <button
          onClick={props.onClick}
          className={clsx(
            styles["navbar-button"],
            styles["nav-item"],
            props.isOpen && styles["nav-item-selected"],
          )}
        >
          <Icon iconName={iconName} className={styles["navbar-logo"]} />
        </button>
      </div>
      {/* Toggable content */}
      {props.isOpen && (
        <div className={clsx(styles["overlayed-mobile-menu"], "w-100")}>
          <div
            className={clsx("d-flex", "flex-column", "gap-3", "px-1", "py-3")}
          >
            <SearchBar placeholder={strings.search.placeholderText} />
            {hasExpandableItems && <NavAccordion items={accordionItems} />}
            <div className={clsx("d-flex", "flex-column", "gap-3", "px-4")}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const NavAccordion: FC<NavAccordionsProps> = (props) => {
  const accordionId = "navAccordion";

  return (
    <div className={clsx("accordion", "accordion-flush")} id={accordionId}>
      {props.items.map((item) => (
        <div className={clsx("accordion-item", "border-bottom")} key={item.id}>
          <h4 className="accordion-header">
            <button
              id={`heading-${item.id}`}
              aria-expanded="false"
              aria-controls={item.id}
              className={clsx(
                "accordion-button",
                "heading-s",
                "text-light",
                "collapsed",
                styles["navbar-accordion-heading"],
              )}
              data-bs-target={`#${item.id}`}
              data-bs-toggle="collapse"
              type="button"
            >
              {item.headerTitle}
            </button>
          </h4>
          <div
            id={item.id}
            aria-labelledby={`heading-${item.id}`}
            className={clsx("accordion-collapse", "collapse")}
            data-bs-parent={`#${accordionId}`}
          >
            <div>{item.bodyContent}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
