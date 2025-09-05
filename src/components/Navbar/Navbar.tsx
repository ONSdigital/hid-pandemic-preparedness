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
import type { NavbarProps } from "./Navbar.interface";

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
