import type { FC } from "react";
import styles from "./CarouselCard.module.scss";
import type { CarouselCardProps } from "./CarouselCard.interface";

const { card, card__divider, card__header, card__icon } = styles;

const CarouselCard: FC<CarouselCardProps> = ({ body, children, title }) => {
  return (
    <div className={card}>
      <div className={card__header}>
        <div className={card__icon}>{children}</div>
        <h1 className="heading-s">{title}</h1>
        <div className={card__divider} />
      </div>
      <p className="body">{body}</p>
      <div>[Try now link] </div>
    </div>
  );
};

export default CarouselCard;
