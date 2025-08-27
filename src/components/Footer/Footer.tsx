import type { FC } from "react";

import type { FooterProps } from "./Footer.interface";
import "./footer.scss";
import type { MenuData } from "../../types/MenuData";

// React component for a footer column
const FooterColumn: FC<MenuData> = ({ title, links }) => {
  return (
    <div className="footer-column">
      <h1 className="heading-s">{title}</h1>
      {links && links.length > 0 && (
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
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
    <footer>
      <FooterColumn {...columnLeft} />
      <FooterColumn {...columnMid} />
      <FooterColumn {...columnRight} />
    </footer>
  );
};
