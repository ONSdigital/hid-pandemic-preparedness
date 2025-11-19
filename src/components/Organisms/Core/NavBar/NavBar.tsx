import { useEffect, useRef, useState, type FC, type RefObject } from "react";
import clsx from "clsx";

import { MegaMenu } from "@/src/components/MegaMenu/MegaMenu";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchBar } from "@/src/components/Molecules/SearchBar/SearchBar";
import strings from "@/src/content/strings.json"; 

import type { MegaMenu as MegaMenuData } from "@localTypes/MegaMenu";
import type { ExpandableItemData, NavBarProps } from "./NavBar.interface";
import styles from "./NavBar.module.scss";

export const NavBar: FC<NavBarProps> = (props) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [megaMenuData, setMegaMenuData] = useState<MegaMenuData | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navBarContainerRef = useRef<HTMLDivElement | null>(null);
  
  handleClickOutside(navBarContainerRef, () => {
    closeMegamenu();
    setIsMobileNavOpen(false);
    setIsSearchOpen(false);
  });

  function toggleDesktopNav(expandableItem: ExpandableItemData) {
    if (expandableItem._uid === openId) {
      closeMegamenu();
    } else {
      setIsSearchOpen(false);
      openMegamenu(expandableItem);
    }
  }

  const toggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    } else {
      closeMegamenu();
      setIsSearchOpen(true);
    }
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  function openMegamenu(expandableItem: ExpandableItemData) {
    setOpenId(expandableItem._uid);
    setMegaMenuData(expandableItem.MegaMenu[0]);
  }

  function closeMegamenu() {
    setOpenId(null);
    setMegaMenuData(null);
  }

  return (
    <>
      <div
        ref={navBarContainerRef}
        className="position-relative"
        style={{ zIndex: 2 }}
      >
        <nav className={clsx("w-100", styles["navbar-bg"])}>
          <div className={clsx("container-lg")}>
            {/* Desktop nav */}
            <div className="d-none d-lg-block">
              <DesktopNav
                {...props}
                openItemId={openId}
                onClick={toggleDesktopNav}
                isSearchOpen={isSearchOpen}
                onSearchToggle={toggleSearch}
              />
            </div>

            {/* Mobile nav */}
            <div className="d-lg-none">
              <MobileNav
                {...props}
                isOpen={isMobileNavOpen}
                onClick={toggleMobileNav}
              />
            </div>
          </div>
        </nav>

        {/* Desktop Megamenu */}
        {megaMenuData && (
          <div
            id={`mega-menu-${openId}`}
            className={clsx(styles["overlayed-desktop-menu"], "w-100")}
          >
            <MegaMenu {...megaMenuData} />
          </div>
        )}

        {/* Desktop Search */}
        {isSearchOpen && (
          <div className={clsx(styles["overlayed-search"], "w-100")}>
            <div className={clsx(styles["navbar-search-panel"])}>
              <div className="container-lg py-4">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <div className="col-xl-9 mx-auto">
                      <SearchBar 
                        placeholder={strings.search.placeholderText}
                        isInline={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      
      {/* Screen dimmer */}
      {(megaMenuData || isMobileNavOpen || isSearchOpen) && (
        <div className={styles["screen-dimmer"]} />
      )}
    </>
  );
};

// ... handleClickOutside remains the same
function handleClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
) {
  useEffect(() => {
    const triggerClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", triggerClickOutside);
    document.addEventListener("touchstart", triggerClickOutside);

    return () => {
      document.removeEventListener("mousedown", triggerClickOutside);
      document.removeEventListener("touchstart", triggerClickOutside);
    };
  }, []);
}