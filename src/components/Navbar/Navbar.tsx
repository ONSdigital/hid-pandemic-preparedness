import type { FC } from "react";
import {
  RiArrowDropDownLine,
  RiGlobalLine,
  RiSearchLine,
} from "@remixicon/react";

import styles from "./Navbar.module.scss";
import type { NavbarProps } from "./Navbar.interface";

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className={styles["navbar"]}>
      <div>
        <a className={styles["navbar-brand"]} href="#">
          Brand
        </a>
      </div>
      <ul className={styles["navbar-nav"]}>
        {props.navItems.map((item) => (
          <li className={styles["nav-item"]}>
            <a className={styles["nav-link"]} href="#">
              {item.label} {item.children && <RiArrowDropDownLine />}
            </a>
            {/* <ul>
              {item.links?.map((link) => (
                <li>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul> */}
          </li>
        ))}
      </ul>
      <div>
        <a className={styles["navbar-locale"]} href="#">
          <RiGlobalLine /> Language
        </a>
      </div>
      <div>
        <a className={styles["navbar-search"]} href="#">
          <RiSearchLine />
        </a>
      </div>
    </nav>
  );
};
