import clsx from "clsx";
import type { FC } from "react";

import type { FooterProps } from "./Footer.interface";

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
      <div className="container-md">
        {/* Large screens: 4 columns */}
        <div className={clsx("row d-none d-md-flex")}>
          {props.columns.map((column, index) => (
            <div className="col-md-3" key={`col-${index}`}>
              <h4 className={clsx("heading-s", "border-bottom", "py-2")}>
                {column.title}
              </h4>
              <p>Content for column g {index}.</p>
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
              .map((column, index) => (
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
                      <h4 className={clsx("heading-s")}>{column.title}</h4>
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
