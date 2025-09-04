import { useState } from "react";
import type { CarouselProps } from "./Carousel.interface";

import styles from "./Carousel.module.scss";
import { ArrowButton } from "../ArrowButton/ArrowButton";
import CarouselCard from "../CarouselCard/CarouselCard";
import type { CarouselCardProps } from "../CarouselCard/CarouselCard.interface";

function getVisibleCards(
  cardsList: CarouselCardProps[],
  leftMostCardIndex: number,
  cardsPerPage: number,
) {
  const total = cardsList.length;
  const visibleCards = [];
  for (let i = 0; i < cardsPerPage; i++) {
    visibleCards.push(cardsList[(leftMostCardIndex + i) % total]);
  }
  return visibleCards;
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const totalCards = props.carouselCardsData.length;
  const cardsPerPage = props.cardsPerPage;

  const [leftMostCardIndex, setLeftMostCardIndex] = useState(0);

  const cardsDisplayed = getVisibleCards(
    props.carouselCardsData,
    leftMostCardIndex,
    cardsPerPage,
  );

  const increasePageNumber = () => {
    setLeftMostCardIndex((val) => (val + 1) % totalCards); //Cycle back to first card
  };

  const decreasePageNumber = () => {
    setLeftMostCardIndex((val) => (val - 1 + totalCards) % totalCards); // Cycle back to last card
  };

  return (
    <div className={styles["carousel"]}>
      <ArrowButton
        ariaLabel="Previous"
        direction="left"
        onClick={decreasePageNumber}
        type="button"
        variant="primary"
      />

      <div className={styles["carousel__cards"]}>
        {cardsDisplayed.map((cardData, idx) => (
          //Key must be unique from one render to the next
          <div key={(leftMostCardIndex + idx) % totalCards}>
            <CarouselCard {...cardData} />
          </div>
        ))}
      </div>

      <ArrowButton
        ariaLabel="Next"
        direction="right"
        onClick={increasePageNumber}
        type="button"
        variant="primary"
      />
    </div>
  );
};

export default Carousel;
