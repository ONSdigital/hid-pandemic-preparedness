import type { FC } from "react";
import clsx from "clsx";

import type { AccordionProps } from "./Accordon.interface";

export const Accordion: FC<AccordionProps> = (props) => {
  const accordionId = props.id;

  return (
    <div className={clsx("accordion", "accordion-flush")} id={accordionId}>
      {props.items.map((item) => (
        <div className="accordion-item" key={item.id}>
          <h2 className="accordion-header">
            <button
              className={clsx("accordion-button", "collapsed")}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${item.id}`}
              aria-expanded="false"
              aria-controls={item.id}
            >
              {item.headerTitle}
            </button>
          </h2>
          <div
            id={item.id}
            className={clsx("accordion-collapse", "collapse")}
            data-bs-parent={`#${accordionId}`}
          >
            <div className="accordion-body">{item.bodyContent}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
