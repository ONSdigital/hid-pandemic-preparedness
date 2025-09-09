import clsx from "clsx";
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
export const Footer: FC<FooterProps> = (props) => {
  return (
    <footer
      className={clsx(
        "w-100",
        "py-4",
        "bg-primary",
        "bg-gradient",
        "text-light",
      )}
    >
      <div className="container">
        {/* Large screens: 4 columns */}
        <div className={clsx("row d-none d-md-flex")}>
          {props.columns.map((column, index) => (
            <div className="col-md-3" key={`col-${index}`}>
              <h5>{column.title}</h5>
              <p>Content for column {index}.</p>
            </div>
          ))}
        </div>
        {/* Small screens: 3 accordions + 1 column below */}
        <div className="d-md-none">
          <div
            className={clsx("accordion", "accordion-flush", "bg-primary")}
            id="footerAccordion"
          >
            {props.columns
              .slice(0, props.columns.length - 1)
              .map((column, index, arr) => (
                <div
                  className={clsx(
                    "accordion-item",
                    "bg-primary",
                    "bg-gradient",
                  )}
                  key={`accordion-${index}`}
                >
                  <h2 className={clsx("accordion-header")}>
                    <button
                      className={clsx(
                        "accordion-button",
                        "collapsed",
                        "bg-primary",
                        "text-light",
                      )}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${index}`}
                    >
                      {column.title}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse${index}`}
                    className={clsx("accordion-collapse", "collapse")}
                    data-bs-parent="#footerAccordion"
                  >
                    <div className="accordion-body">
                      Placeholder content for this accordion, which is intended
                      to demonstrate the <code>.accordion-flush</code> class.
                      This is the first item’s accordion body.
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {props.columns[props.columns.length - 1] && (
            <div className="mt-4">
              <h5>Column 4</h5>
              <p>Content for column 4.</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
