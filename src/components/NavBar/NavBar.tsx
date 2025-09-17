import {
  RiArrowDownSLine,
  RiCloseLine,
  RiGlobalLine,
  RiMenuLine,
} from "@remixicon/react";
import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import type { NavItem } from "../../types/NavItem";
import type { NavBarProps } from "./NavBar.interface";
import { MegaMenu } from "../MegaMenu/MegaMenu";
import {
  NavBarSearch,
  NavBarLanguageSelector,
  MobileMenu,
  MobileLanguageSelector,
} from "./components";
import styles from "./NavBar.module.scss";

export const NavBar: FC<NavBarProps> = ({
  items,
  languages,
  selectedLanguage,
}) => {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    visible: boolean;
  }>({ left: 0, width: 0, visible: false });

  const navRef = useRef<HTMLDivElement>(null);

  const findActiveNavItem = (): NavItem | null => {
    const currentPath = window.location.pathname;

    for (const item of items) {
      if (item.href && item.href !== "#" && currentPath === item.href) {
        return item;
      }

      if (item.children) {
        const hasActiveChild = checkChildrenForPath(item.children, currentPath);
        if (hasActiveChild) {
          return item;
        }
      }
    }

    for (const item of items) {
      if (item.children) {
        const pathSegment = currentPath.split("/")[1];
        const normalizedLabel = item.label.toLowerCase().replace(/\s+/g, "-");
        if (pathSegment === normalizedLabel) {
          return item;
        }
      }
    }

    return null;
  };

  const checkChildrenForPath = (children: NavItem[], path: string): boolean => {
    for (const child of children) {
      if (child.href && child.href !== "#" && path === child.href) {
        return true;
      }
      if (child.children && checkChildrenForPath(child.children, path)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const activeItem = findActiveNavItem();
    if (activeItem && !selectedItem) {
      setSelectedItem(activeItem);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setSelectedItem(null);
    setIsLanguageDropdownOpen(false);
  };

  const handleLanguageToggle = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsMobileMenuOpen(false);
  };

  const updateIndicator = (element: HTMLElement | null, visible: boolean) => {
    if (!element || !navRef.current) {
      setIndicatorStyle({ left: 0, width: 0, visible: false });
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    setIndicatorStyle({
      left: elementRect.left - navRect.left,
      width: elementRect.width,
      visible,
    });
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.children) {
      setSelectedItem(selectedItem?.id === item.id ? null : item);
    } else {
      setSelectedItem(null);
      setIsMobileMenuOpen(false);

      if (item.href) {
        window.location.href = item.href;
      }
    }
  };

  const handleNavItemHover = (
    item: NavItem | null,
    element: HTMLElement | null,
  ) => {
    setHoveredItem(item);
    updateIndicator(element, !!item);
  };

  useEffect(() => {
    if (selectedItem && navRef.current) {
      const activeElement = navRef.current.querySelector(
        `[data-item-id="${selectedItem.id}"]`,
      ) as HTMLElement;
      if (activeElement && !hoveredItem) {
        updateIndicator(activeElement, true);
      }
    } else if (!hoveredItem) {
      setIndicatorStyle({ left: 0, width: 0, visible: false });
    }
  }, [selectedItem, hoveredItem]);

  return (
    <nav className={styles.navbar}>
      {/* Main Navigation Bar */}
      <div className={styles["navbar-container"]} ref={navRef}>
        <div className={styles["navbar-content"]}>
          {/* Logo */}
          <div className={styles["navbar-logo"]}>
            <img
              src="./images/logos/analysis-for-action-logo-2.svg"
              alt="Analysis for Action"
              className={styles["logo-image"]}
            />
          </div>

          {/* Desktop Navigation */}
          <div
            className={clsx(
              styles["navbar-nav"],
              styles["navbar-nav--desktop"],
            )}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={styles["navbar-item"]}
                data-item-id={item.id}
                onMouseEnter={(e) => handleNavItemHover(item, e.currentTarget)}
                onMouseLeave={() => handleNavItemHover(null, null)}
              >
                {item.children ? (
                  <button
                    type="button"
                    className={clsx(
                      "gap-1",
                      styles["navbar-link"],
                      selectedItem?.id === item.id &&
                        styles["navbar-link--active"],
                    )}
                    onClick={() => handleNavItemClick(item)}
                  >
                    {item.label}
                    <span className={styles["navbar-chevron"]}>
                      <RiArrowDownSLine />
                    </span>
                  </button>
                ) : (
                  <a href={item.href} className={styles["navbar-link"]}>
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Orange indicator bar */}
          <div
            className={clsx(
              styles["navbar-indicator"],
              indicatorStyle.visible && styles["navbar-indicator--visible"],
            )}
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />

          {/* Right Section */}
          <div className={styles["navbar-actions"]}>
            {/* Desktop Language Selector */}
            <NavBarLanguageSelector
              languages={languages}
              selectedLanguage={selectedLanguage}
            />

            {/* Desktop Search */}
            <NavBarSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Mobile Language Toggle */}
            <button
              type="button"
              className={styles["mobile-language-toggle"]}
              onClick={handleLanguageToggle}
            >
              <RiGlobalLine />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className={styles["mobile-menu-toggle"]}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        items={items}
        selectedItem={selectedItem}
        onNavItemClick={handleNavItemClick}
      />

      {/* Mobile Language Selector */}
      <MobileLanguageSelector
        isOpen={isLanguageDropdownOpen}
        languages={languages}
        selectedLanguage={selectedLanguage}
      />

      {/* Desktop Mega Menu */}
      {selectedItem && selectedItem.children && (
        <div className={styles["desktop-mega-menu"]}>
          <MegaMenu navItems={selectedItem.children} />
        </div>
      )}
    </nav>
  );
};
