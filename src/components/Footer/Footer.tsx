import clsx from "clsx";
import type { FC } from "react";

import type { FooterColumnLinksProps, FooterProps } from "./Footer.interface";
import styles from "./Footer.module.scss";

const FooterColumnLinks: FC<FooterColumnLinksProps> = (props) => {
  return (
    <>
      {props.links?.map((link) => (
        <p>
          <a
            className={clsx(
              "fw-light",
              "link-light",
              "link-underline",
              "link-underline-opacity-0",
            )}
            href={link.href}
            aria-disabled={link.disabled}
          >
            {link.label}
          </a>
        </p>
      ))}
    </>
  );
};

// React component for the footer
export const Footer: FC<FooterProps> = (props) => {
  return (
    <footer
      className={clsx(
        "w-100",
        "bg-primary",
        "bg-gradient",
        "text-light",
        "py-4",
      )}
    >
      <div className={clsx("container-xl")}>
        <div className={clsx("row", "row-cols-1", "row-cols-lg-4")}>
          {props.columns.map((col) => (
            <div className={clsx("col")} key={col.id}>
              <div className={clsx(styles["col-title-block"])}>
                {col.title && (
                  <h4 className={clsx("heading-s")}>{col.title}</h4>
                )}
              </div>
              <FooterColumnLinks links={col.links} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
