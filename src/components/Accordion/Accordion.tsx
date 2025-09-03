import type { FC } from "react";
import { useId, useState } from "react";

import {
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiArrowRightLine,
} from "@remixicon/react";

import styles from "./Accordion.module.scss";

import type { AccordionProps } from "./Accordion.interface";
import { Button } from "../Button/Button";

const { accordion__button, accordion__content } = styles;

const Accordion: FC<AccordionProps> = ({ title, body, nextButton = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((val) => !val);

  const id = useId(); //Generate unique ID
  const buttonId = `accordion-button-${id}`;
  const panelId = `accordion-panel-${id}`;

  return (
    <>
      <div className={styles.accordion__divider} />
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${title} section`}
        className={accordion__button}
        onClick={toggleOpen}
        type="button"
      >
        <h1 className="heading-m" id={`${buttonId}-label`}>
          {title}
        </h1>
        {isOpen == true ? (
          <RiArrowUpSLine aria-hidden="true" />
        ) : (
          <RiArrowDownSLine aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <div
          aria-labelledby={`${buttonId}-label`}
          className={accordion__content}
          id={panelId}
          role="region"
        >
          <p className="body">{body}</p>
          {nextButton && (
            <Button ariaLabel="Next chapter" type="button" variant="primary">
              <div>Next Chapter</div>
              <div>
                <RiArrowRightLine className="button__label-icon" />
              </div>
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Accordion;
