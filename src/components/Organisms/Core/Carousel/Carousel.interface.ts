export interface CarouselItem {
  _uid: string;
  component: string;
  [key: string]: any; //Other props will vary depending on what is passed to Carousel
}
export interface CarouselProps {
  cards: CarouselItem[];
}
export interface DynamicCarouselItemComponentProps {
  blok: any;
}
