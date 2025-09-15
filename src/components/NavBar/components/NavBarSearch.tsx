import { RiSearchLine } from "@remixicon/react";
import type { FC } from "react";
import { useState } from "react";
import clsx from "clsx";

import styles from "../NavBar.module.scss";

interface NavBarSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export const NavBarSearch: FC<NavBarSearchProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search learning resources",
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector(
          `.${styles["search-input"]}`,
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  };

  return (
    <div className={styles["search-container"]}>
      {/* Collapsible Search Input */}
      <div
        className={clsx(
          styles["search-input-container"],
          isSearchOpen && styles["search-input-container--open"],
        )}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles["search-input"]}
        />
      </div>

      {/* Search Toggle Button */}
      <button
        type="button"
        className={clsx(
          styles["search-toggle"],
          isSearchOpen && styles["search-toggle--active"],
        )}
        onClick={toggleSearch}
      >
        <RiSearchLine />
      </button>
    </div>
  );
};
