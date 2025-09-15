import { RiArrowDownLine } from "@remixicon/react";
import type { FC } from "react";
import clsx from "clsx";

import type { NavItem } from "../../../types/NavItem";
import { MegaMenu } from "../../MegaMenu/MegaMenu";
import SearchBar from "../../SearchBar/SearchBar";
import styles from "../NavBar.module.scss";

interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  selectedItem: NavItem | null;
  onNavItemClick: (item: NavItem) => void; // eslint-disable-line no-unused-vars
}

export const MobileMenu: FC<MobileMenuProps> = ({
  isOpen,
  items,
  selectedItem,
  onNavItemClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles["mobile-menu"]}>
      <div className={styles["mobile-menu-content"]}>
        {/* Mobile Search */}
        <div className={styles["mobile-search"]}>
          <SearchBar placeholder="Search learning resources" />
        </div>

        {/* Mobile Navigation Items */}
        <div className={styles["mobile-nav"]}>
          {items.map((item) => (
            <div key={item.id} className={styles["mobile-nav-item"]}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    className={clsx(
                      styles["mobile-nav-link"],
                      selectedItem?.id === item.id &&
                        styles["mobile-nav-link--active"],
                    )}
                    onClick={() => onNavItemClick(item)}
                  >
                    {item.label}
                    <span className={styles["mobile-nav-chevron"]}>
                      <RiArrowDownLine />
                    </span>
                  </button>

                  {/* Mobile Mega Menu */}
                  {selectedItem?.id === item.id && selectedItem.children && (
                    <div className={styles["mobile-mega-menu"]}>
                      <MegaMenu navItems={selectedItem.children} />
                    </div>
                  )}
                </>
              ) : (
                <a href={item.href} className={styles["mobile-nav-link"]}>
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
