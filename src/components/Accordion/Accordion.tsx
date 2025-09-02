import type { FC } from "react";
import { useState } from "react";

import { RiArrowUpSLine, RiArrowDownSLine } from "@remixicon/react";

import styles from "./Accordion.module.scss";

import { Button } from "../Button/Button";

const { accordion__button, accordion__content, next_button } = styles;

const nextButton = true;

const Accordion: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((val) => !val);

  return (
    <div>
      <div className={styles.accordion__divider} />
      <div onClick={toggleOpen} className={accordion__button}>
        <h1>TITLE GOES HERE</h1>
        {isOpen == true ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
      </div>
      {isOpen && (
        <>
          <div className={accordion__content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, cum
            quas facilis sint commodi fuga. Nam culpa recusandae itaque tempore
            labore veritatis enim id porro magni ducimus aut atque earum quam
            animi doloribus placeat ullam neque, repudiandae reprehenderit iste
            fugit delectus distinctio! Tenetur sapiente corrupti dignissimos
            doloribus! Quibusdam sint voluptatum cumque consequuntur eaque,
            laborum repellendus ratione est commodi? Quidem, ut nisi esse
            assumenda, nihil iure laborum quaerat, eos sint ad ducimus
            veritatis. Aut tenetur tempora praesentium labore, cupiditate eius
            impedit, quod neque error consectetur sapiente nobis voluptates ea,
            officiis at perspiciatis dicta? Sapiente soluta aliquam similique et
            amet quaerat doloribus.
          </div>
          {nextButton && (
            <Button ariaLabel="Next chapter" type="button" variant="primary">
              <p>hi</p>
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Accordion;
