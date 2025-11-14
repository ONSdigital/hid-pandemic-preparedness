import clsx from "clsx";
import type { FC } from "react";
import { sentenceCase } from "sentence-case";

import { StrategicPartner } from "@src/components/Molecules/Home/StrategicPartner/StrategicPartner";

import type { StrategicPartnersProps } from "./StrategicPartners.interface";
import styles from "./StrategicPartners.module.scss";

export const StrategicPartners: FC<StrategicPartnersProps> = (props) => {
  return (
    <div className={clsx("w-100", "py-4", styles["background-color"])}>
      <div
        className={clsx("container-lg", "text-center", styles["text-color"])}
      >
        <div className={clsx("row")}>
          <h3 role="strategic-partners-title" className={clsx("heading-m")}>
            {sentenceCase(props.title)}
          </h3>
        </div>
        <div
          className={clsx(
            "row",
            "row-cols-1",
            "row-cols-lg-4",
            "d-flex",
            "align-items-center",
            "justify-content-center",
            "py-4",
          )}
        >
          {props.partners.map((partner) => (
            <StrategicPartner {...partner} key={partner._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};
