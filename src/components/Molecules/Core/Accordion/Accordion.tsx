import type { FC } from "react";
import clsx from "clsx";

import type { AccordionProps } from "./Accordion.interface";
import styles from "./Accordion.module.scss";

export const Accordion: FC<AccordionProps> = (props) => {
  const accordionId = props.id;

  return (
    <div className={clsx("accordion", "accordion-flush")} id={accordionId}>
      {props.items.map((item) => (
        <div className={clsx("accordion-item", "border-bottom")} key={item.id}>
          <h2 className={clsx("accordion-header")}>
            <button
              className={clsx(
                "accordion-button",
                "collapsed",
                props.variant === "primary" &&
                  styles["accordion-button-primary"],
              )}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${item.id}`}
              aria-expanded="false"
              aria-controls={item.id}
            >
              <h4 className={clsx("heading-s")}>{item.headerTitle}</h4>
            </button>
          </h2>
          <div
            id={item.id}
            className={clsx(
              "accordion-collapse",
              "collapse",
              props.expandAll && "show",
            )}
          >
            <div className="accordion-body">{item.bodyContent}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
