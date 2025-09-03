import type { FC } from "react";

import styles from "./CarouselCard.module.scss";
import type { CarouselCardProps } from "./CarouselCard.interface";

const CarouselCard: FC<CarouselCardProps> = ({ body, children, title }) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__header"]}>
        <div className={styles["card__icon-wrapper"]}>
          <div className={styles["card__icon"]}>{children}</div>
        </div>
        <h1 className="heading-s">{title}</h1>
        <div className={styles["card__divider"]} />
      </div>
      <p className="body">{body}</p>
      <div>[Try now link] </div>
    </div>
  );
};

export default CarouselCard;
