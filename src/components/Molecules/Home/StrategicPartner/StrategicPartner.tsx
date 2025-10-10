import clsx from "clsx";
import type { FC } from "react";

import { Image } from "@src/components/Molecules/Core/Image/Image";

import type { StrategicPartnerProps } from "./StrategicPartner.interface";

export const StrategicPartner: FC<StrategicPartnerProps> = (props) => {
  return (
    <div className={clsx("col", "py-4")}>
      <a role={"partner-link"} href={props.link.url}>
        <Image {...props.logo} />
      </a>
    </div>
  );
};
