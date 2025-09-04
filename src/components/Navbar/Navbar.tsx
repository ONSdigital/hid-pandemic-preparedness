import type { FC } from "react";

import styles from "./Navbar.module.scss";
import type { NavbarProps } from "./Navbar.interface";

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className={styles["navbar"]}>
      <div>
        <a className={styles["navbar__brand"]} href="#">
          Brand
        </a>
      </div>
      <ul>
        {props.menuItems.map((item) => (
          <li>
            <a href="#">{item.title}</a>
            <ul>
              {item.links?.map((link) => (
                <li>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
