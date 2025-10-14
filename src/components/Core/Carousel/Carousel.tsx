import { useRef, type FC, type RefObject } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperInstance from "swiper";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowButton } from "../../ArrowButton/ArrowButton";
import clsx from "clsx";
import styles from "./Carousel.module.scss";
import type { CarouselProps } from "./Carousel.interface";

export interface SwiperButtonProps {
  swiperRef: RefObject<SwiperInstance | null>;
}

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
          spaceBetween={50}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            // md
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {props.carouselItems.map((item) => (
            <SwiperSlide>{item}</SwiperSlide>
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
