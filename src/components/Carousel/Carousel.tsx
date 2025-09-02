import { useState } from "react";
import type { CarouselProps } from "./Carousel.interface";

import styles from "./Carousel.module.scss";
import { ArrowButton } from "../ArrowButton/ArrowButton";

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const cardsPerPage = 3;
  const totalCards = children.length;

  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const visibleCards = children.slice(startIndex, endIndex);
  const isLastPage = currentPage === totalPages - 1;

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselInner}>
        <ArrowButton
          ariaLabel="Previous"
          disabled={currentPage === 0}
          onClick={handlePrev}
          type="button"
          variant="primary"
        />

        <div
          className={`${styles.carouselCards} ${
            isLastPage ? styles.justifyFlexStart : styles.justifySpaceBetween
          }`}
        >
          {visibleCards.map((child, idx) => (
            <div
              key={startIndex + idx}
              className={styles.cardWrapper}
              style={{ flex: `0 0 ${100 / cardsPerPage}%` }}
            >
              {child}
            </div>
          ))}
        </div>

        <ArrowButton
          ariaLabel="Next"
          disabled={currentPage === totalPages - 1}
          onClick={handleNext}
          type="button"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default Carousel;
