import type { FC } from "react";

import type { FooterProps } from "./Footer.interface";
import styles from "./Footer.module.scss";
import type { MenuData } from "../../types/MenuData";

// React component for a footer column
const FooterColumn: FC<MenuData> = ({ title, links }) => {
  return (
    <div className={styles["footer__footer-column"]}>
      <h1 className="heading-s">{title}</h1>
      {links && links.length > 0 && (
        <ul className={styles["footer__list"]}>
          {links.map((link) => (
            <li className={styles["footer__item"]} key={link.href}>
              <a className={styles["footer__link"]} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// React component for the footer
export const Footer: FC<FooterProps> = ({
  columnLeft,
  columnMid,
  columnRight,
}) => {
  return (
    <footer className={styles["footer"]}>
      <FooterColumn {...columnLeft} />
      <FooterColumn {...columnMid} />
      <FooterColumn {...columnRight} />
    </footer>
  );
};
