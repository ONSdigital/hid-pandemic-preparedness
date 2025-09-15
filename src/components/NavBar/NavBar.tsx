import {
  RiArrowDownLine,
  RiCloseLine,
  RiGlobalLine,
  RiMenuLine,
} from "@remixicon/react";
import type { FC } from "react";
import { useState } from "react";
import clsx from "clsx";

import type { NavBarProps, NavItem } from "./Navbar.interface";
import { MegaMenu } from "../MegaMenu/MegaMenu";
import {
  NavBarSearch,
  NavBarLanguageSelector,
  MobileMenu,
  MobileLanguageSelector,
} from "./components";
import styles from "./NavBar.module.scss";

const NavBar: FC<NavBarProps> = ({ items, languages, selectedLanguage }) => {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setSelectedItem(null);
    setIsLanguageDropdownOpen(false);
  };

  const handleLanguageToggle = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsMobileMenuOpen(false);
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

  return (
    <nav className={styles.navbar}>
      {/* Main Navigation Bar */}
      <div className={styles["navbar-container"]}>
        <div className={styles["navbar-content"]}>
          {/* Logo */}
          <div className={styles["navbar-logo"]}>
            <img
              src="/logo.png"
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
              <div key={item.id} className={styles["navbar-item"]}>
                {item.children ? (
                  <button
                    type="button"
                    className={clsx(
                      styles["navbar-link"],
                      selectedItem?.id === item.id &&
                        styles["navbar-link--active"],
                    )}
                    onClick={() => handleNavItemClick(item)}
                  >
                    {item.label}
                    <span className={styles["navbar-chevron"]}>
                      <RiArrowDownLine />
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

export default NavBar;
