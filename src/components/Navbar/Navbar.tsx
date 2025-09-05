import type { FC } from "react";
import { useState } from "react";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiGlobalLine,
  RiMenuLine,
  RiSearchLine,
} from "@remixicon/react";

import type { NavItem } from "../../types/NavItem";
import styles from "./Navbar.module.scss";
import type { BrandProps, NavbarProps } from "./Navbar.interface";

// eslint-disable-next-line no-unused-vars
const MegaMenu: FC<NavItem[]> = (props) => {
  return <div className={styles["mega-menu"]}>Blah</div>;
};

const NavbarItem: FC<NavItem> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggles state
  const toggleOpen = () => setIsOpen((val) => !val);

  return (
    <li className={styles["nav-item"]}>
      <a className={styles["nav-link"]} href={void 0} onClick={toggleOpen}>
        {props.label}{" "}
        {props.children &&
          (isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />)}
      </a>
      {props.children && isOpen && <MegaMenu {...props.children} />}
    </li>
  );
};

// Brand component inputted as separate component to `Navbar` via props so we can load different
// src paths depending on whether we are rendering on Storybook or Astro page. This will
// probably be updated once we figure out how to properly get Storybook to load svgs as components
// automatically
export const Brand: FC<BrandProps> = (props) => {
  return (
    <img
      src={props.src}
      height="40px"
      alt="The Analysis for Action brand logo."
    />
  );
};

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className={styles["navbar"]}>
      <div>
        <a className={styles["navbar-brand"]} href="#">
          {props.brandComponent}
        </a>
      </div>
      <ul className={styles["navbar-nav"]}>
        {props.navItems.map((item) => (
          <NavbarItem {...item} />
        ))}
      </ul>
      <div>
        <a className={styles["navbar-locale"]} href="#">
          <RiGlobalLine />{" "}
          <span className={styles["navbar-locale__descriptor"]}>Language</span>
        </a>
      </div>
      <div>
        <a className={styles["navbar-search"]} href="#">
          <RiSearchLine />
        </a>
      </div>
      <div>
        <a className={styles["navbar-hamburger"]} href="#">
          <RiMenuLine />
        </a>
      </div>
    </nav>
  );
};
