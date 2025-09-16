import clsx from "clsx";
import type { FC } from "react";
import React, { useState, useRef } from "react";

import { Button } from "../../Button/Button";
import { CardTool } from "../../CardTool/CardTool";
import type { CardToolProps } from "../../CardTool/CardTool.interface";
import { CardUnit } from "../../CardUnit/CardUnit";
import type { CardUnitProps } from "../../CardUnit/CardUnit.interface";
import type { CarouselProps } from "./Carousel.interface";
import styles from "./Carousel.module.scss";

export const Carousel: FC<CarouselProps> = ({
  type,
  items,
  itemsPerView = 3,
  showNavigation = true,
  className,
  title,
  callToAction,
  subtitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const hasSwiped = useRef<boolean>(false);

  const maxIndex = Math.max(0, items.length - itemsPerView);
  const canGoPrevious = items.length > itemsPerView;
  const canGoNext = items.length > itemsPerView;

  const handlePrevious = () => {
    if (items.length <= itemsPerView) return;

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(maxIndex);
    }
  };

  const handleNext = () => {
    if (items.length <= itemsPerView) return;

    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const getCurrentItems = () => {
    return items.slice(currentIndex, currentIndex + itemsPerView);
  };

  const renderItem = (item: any, index: number) => {
    const key = `carousel-item-${currentIndex}-${index}`;

    switch (type) {
      case "CardTool":
        return <CardTool key={key} {...(item as CardToolProps)} />;
      case "CardUnit":
        return <CardUnit key={key} {...(item as CardUnitProps)} />;
      case "ReactNode":
        return <React.Fragment key={key}>{item}</React.Fragment>;
      default:
        return null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
    hasSwiped.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;

    if (touchStartX.current && touchEndX.current) {
      const distance = Math.abs(touchStartX.current - touchEndX.current);
      if (distance > 10) {
        hasSwiped.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      touchStartX.current = null;
      hasSwiped.current = false;
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      hasSwiped.current = true;

      if (distance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleLeftTap = (e: React.MouseEvent) => {
    if (!hasSwiped.current) {
      e.preventDefault();
      handlePrevious();
    }

    hasSwiped.current = false;
  };

  const handleRightTap = (e: React.MouseEvent) => {
    if (!hasSwiped.current) {
      e.preventDefault();
      handleNext();
    }

    hasSwiped.current = false;
  };

  return (
    <div className={clsx(styles.carousel, className)}>
      {title && (
        <h2
          className={clsx(
            "d-flex",
            "justify-content-center",
            "heading-m",
            "mb-4",
            styles["carousel-title"],
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={clsx(
            "d-flex",
            "justify-content-center",
            "text-center",
            "mb-4",
            styles["carousel-subtitle"],
          )}
        >
          {subtitle}
        </p>
      )}
      <div className={styles["carousel-container"]}>
        {/* Navigation - Previous */}
        {showNavigation && (
          <button
            type="button"
            className={clsx(
              styles["carousel-nav"],
              styles["carousel-nav--prev"],
              !canGoPrevious && styles["carousel-nav--disabled"],
            )}
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            aria-label="Previous items"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Carousel Content */}
        <div className={styles["carousel-content"]}>
          {/* Mobile tap zones */}
          <div
            className={styles["mobile-tap-zone-left"]}
            onClick={handleLeftTap}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-label="Previous item"
          />
          <div
            className={styles["mobile-tap-zone-right"]}
            onClick={handleRightTap}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-label="Next item"
          />

          <div
            className={styles["carousel-track"]}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getCurrentItems().map((item, index) => (
              <div
                key={`carousel-item-${currentIndex}-${index}`}
                className={styles["carousel-item"]}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation - Next */}
        {showNavigation && (
          <button
            type="button"
            className={clsx(
              styles["carousel-nav"],
              styles["carousel-nav--next"],
              !canGoNext && styles["carousel-nav--disabled"],
            )}
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next items"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {showNavigation && items.length > itemsPerView && (
        <div className={styles["carousel-pagination"]}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={clsx(
                styles["carousel-dot"],
                index === currentIndex && styles["carousel-dot--active"],
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
      {callToAction && (
        <div
          className={clsx(
            "d-flex",
            "justify-content-center",
            "mt-4",
            styles["carousel-call-to-action"],
          )}
        >
          <Button
            ariaLabel={callToAction.label}
            type="button"
            variant="secondary"
            onClick={() => (window.location.href = callToAction.href)}
          >
            {callToAction.label}
          </Button>
        </div>
      )}
    </div>
  );
};
