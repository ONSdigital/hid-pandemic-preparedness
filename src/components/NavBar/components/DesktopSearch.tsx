import type { FC } from "react";
import { useState } from "react";
import clsx from "clsx";
import { Icon } from "../../Icon/Icon";

interface DesktopSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export const DesktopSearch: FC<DesktopSearchProps> = ({
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
          ".search-input",
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  };

  return (
    <div className="search-container">
      {/* Collapsible Search Input */}
      <div
        className={clsx(
          "search-input-container",
          isSearchOpen && "search-input-container--open",
        )}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Search Toggle Button */}
      <button
        type="button"
        className={clsx(
          "search-toggle",
          isSearchOpen && "search-toggle--active",
        )}
        onClick={toggleSearch}
      >
        <Icon name="search" />
      </button>
    </div>
  );
};
