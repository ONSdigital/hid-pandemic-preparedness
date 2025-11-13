import type { FC } from "react";
import clsx from "clsx";

import type { ToolsCarouselProps } from "./ToolsCarousel.interface";
import { Carousel } from "@components/Organisms/Core/Carousel/Carousel";
import { Link } from "@components/Molecules/Core/Link/Link";

import styles from "./ToolsCarousel.module.scss";

export const ToolsCarousel: FC<ToolsCarouselProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["tools-carousel"])}>
      <div
        className={clsx(
          "container-lg",
          "d-flex",
          "flex-column",
          "justify-content-center",
          "align-items-center",
          "gap-4",
        )}
      >
        <h3 className={clsx("heading-m", "text-center")}>{props.title}</h3>
        <Carousel {...props.Carousel[0]} />
        <Link
          asButton={true}
          buttonVariant="secondary"
          {...props.link[0].link}
          label={props.link[0].label}
        />
      </div>
    </div>
  );
};
