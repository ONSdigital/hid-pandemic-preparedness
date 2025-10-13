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

export interface SwiperButtonProps {
  swiperRef: RefObject<SwiperInstance | null>;
}

export const Carousel: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const hiddenNavigation = clsx("d-none", "d-md-block");
  return (
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
        pagination={true}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "#f99",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "#9f9",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "#99f",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "#ffcc00",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 4
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "#00cccc",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 5
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundColor: "#cc00cc",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Slide 6
          </div>
        </SwiperSlide>
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
  );
};
