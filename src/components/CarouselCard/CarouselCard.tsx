import type { FC } from "react";

import styles from "./CarouselCard.module.scss";
import type { CarouselCardProps } from "./CarouselCard.interface";

const CarouselCard: FC<CarouselCardProps> = (props) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__header"]}>
        <div className={styles["card__icon-wrapper"]}>
          <div className={styles["card__icon"]}>{props.iconComponent}</div>
        </div>
        <h1 className="heading-s">{props.title}</h1>
        <div className={styles["card__divider"]} />
      </div>
      <p className="body">{props.body}</p>
      {props.linkComponent}
    </div>
  );
};

export default CarouselCard;
