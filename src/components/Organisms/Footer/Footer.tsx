import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@components/Molecules/Core/Link/Link";

import type {
  FooterColumnLinksProps,
  FooterColumnTitleProps,
  FooterProps,
} from "./Footer.interface";

import styles from "./Footer.module.scss";

const FooterColumnLinks: FC<FooterColumnLinksProps> = (props) => {
  return (
    <>
      {props.links?.map((item) => (
        <p key={item._uid}>
          <Link {...item.link} textInverse={true} />
        </p>
      ))}
    </>
  );
};

const FooterColumnTitleBlock: FC<FooterColumnTitleProps> = (props) => {
  return (
    <div className={clsx(styles["col-title-block"], "mb-3")}>
      {props.title && (
        <h4 className={clsx("heading-s", "text-light")}>{props.title}</h4>
      )}
    </div>
  );
};

export const Footer: FC<FooterProps> = (props) => {
  console.log(props.columns.slice(0, 3));
  const accordionId: string = "footerAccordion";

  return (
    <footer
      className={clsx("w-100", styles["footer-bg"], "text-light", "py-4")}
    >
      <div className={clsx("container-lg")}>
        <div className={clsx("row", "row-cols-1", "row-cols-lg-4")}>
          {/* Columns for viewports sm and up first three */}
          {props.columns.slice(0, 3).map((col) => (
            <div className={clsx("col", "d-none", "d-sm-block")} key={col._uid}>
              <FooterColumnTitleBlock title={col.title} />
              <FooterColumnLinks links={col.links} />
            </div>
          ))}
          {/* Accordion for viewports sm and down first three */}
          <div
            className={clsx("accordion", "accordion-flush", "d-sm-none")}
            id={accordionId}
            // Theme set to dark here to quickly make button icon visible against dark background.
            // May be better in future to override this to a custom colour.
            data-bs-theme="dark"
          >
            {props.columns.slice(0, 3).map((col) => (
              <div className={clsx("accordion-item")} key={col._uid}>
                <h4 className={clsx("accordion-header")}>
                  <button
                    className={clsx(
                      "accordion-button",
                      "heading-s",
                      "text-light",
                      styles["button-bg"],
                    )}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${col._uid}`}
                    aria-expanded="true"
                    aria-controls={col._uid}
                  >
                    {col.title}
                  </button>
                </h4>
                <div
                  id={col._uid}
                  className={clsx("accordion-collapse", "collapse", "show")}
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className={clsx("accordion-body")}>
                    <FooterColumnLinks links={col.links} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={clsx("col")}>
            <FooterColumnTitleBlock
              title={props.columns[props.columns.length - 1].title}
            />
            {/* A bit of a hack to get these links to line up with accordion above */}
            <div className={clsx("px-4")}>
              <FooterColumnLinks
                links={props.columns[props.columns.length - 1].links}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
