import type { FC } from "react";

import type { FooterProps } from "./Footer.interface";
import "./Footer.scss";
import type { MenuData } from "../../types/MenuData";

// React component for a footer column
const FooterColumn: FC<MenuData> = ({ title, links }) => {
  return (
    <div className="footer__footer-column">
      <h1 className="heading-s">{title}</h1>
      {links && links.length > 0 && (
        <ul className="footer__list">
          {links.map((link) => (
            <li className="footer__item" key={link.href}>
              <a className="footer__link" href={link.href}>
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
    <footer className="footer">
      <FooterColumn {...columnLeft} />
      <FooterColumn {...columnMid} />
      <FooterColumn {...columnRight} />
    </footer>
  );
};
