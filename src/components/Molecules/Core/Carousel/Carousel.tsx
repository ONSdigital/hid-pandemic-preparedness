import { useRef, type FC } from "react";

import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import clsx from "clsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Carousel.module.scss";

import { ArrowButton } from "@components/ArrowButton/ArrowButton";
import { ToolCard } from "@components/ToolCard/ToolCard";
import { CardUnit } from "@components/CardUnit/CardUnit";
import type {
  CarouselProps,
  DynamicCarouselItemComponentProps,
} from "./Carousel.interface";

// List of components that we allow the Carousel to render
type ComponentName = "ToolCard" | "CardUnit";
export const COMPONENT_MAP: Record<ComponentName, FC<any>> = {
  ToolCard,
  CardUnit,
};

export const DynamicCarouselItemComponent: FC<
  DynamicCarouselItemComponentProps
> = ({ blok }) => {
  const component: string = blok.component;

  // If we are trying to render a blok we don't have a corresponding component for, raise error
  if (!Object.keys(COMPONENT_MAP).includes(component)) {
    throw new Error(
      `DynamicComponent error: Component "${component}" not found in COMPONENT_MAP.`,
    );
  }
  const Component = COMPONENT_MAP[component as ComponentName];

  // Spread blok properties as props
  return <Component key={blok._uid} {...blok} />;
};

export const Carousel: FC<CarouselProps> = (props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const hiddenNavigation = clsx("d-none", "d-md-block");

  return (
    <>
      <div className="d-flex align-items-center gap-3">
        <div className={hiddenNavigation}>
          <ArrowButton
            ariaLabel="Previous"
            direction="left"
            onClick={() => swiperRef.current?.slidePrev()}
            type="button"
            variant="secondary"
          />
        </div>

        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          loop={true}
          modules={[Navigation, Pagination]}
          onSwiper={(swiper: any) => (swiperRef.current = swiper)}
          pagination={{
            clickable: true,
            el: "#container-for-pagination-bullets",
            type: "bullets",
            bulletClass: styles["swiper-default-bullets"],
            bulletActiveClass: styles["swiper-active-bullets"],
          }}
          spaceBetween={30}
        >
          {props.cards.map((blok: any) => (
            <SwiperSlide
              key={blok._uid}
              className={clsx(
                styles["swiper-slide-container"],
                "d-flex justify-content-center",
              )}
            >
              <DynamicCarouselItemComponent blok={blok} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={hiddenNavigation}>
          <ArrowButton
            ariaLabel="Next"
            direction="right"
            onClick={() => swiperRef.current?.slideNext()}
            type="button"
            variant="secondary"
          />
        </div>
      </div>
      {/* Swiper.js references this div when creating custom pagination bullets*/}
      <div
        id="container-for-pagination-bullets"
        className="d-flex d-md-none justify-content-center gap-3 mt-4"
      ></div>
    </>
  );
};
