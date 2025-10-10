import clsx from "clsx";
import type { FC } from "react";

import type { StrategicPartnerProps } from "./StrategicPartner.interface";

export const StrategicPartner: FC<StrategicPartnerProps> = (props) => {
  const alt: string = props.logo.alt ? props.logo.alt : "";
  const src: string = props.logo.filename ? props.logo.filename : "null";

  return (
    <div className={clsx("col", "py-4")}>
      <a role={"partner-link"} href={props.link.url}>
        <img role={"partner-image"} src={src} alt={alt}></img>
      </a>
    </div>
  );
};
