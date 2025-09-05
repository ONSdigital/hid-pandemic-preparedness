import type { CarouselCardProps } from "../CarouselCard/CarouselCard.interface";

export interface CarouselProps {
  cardsPerPage: number;
  carouselCardsData: CarouselCardProps[];
}
