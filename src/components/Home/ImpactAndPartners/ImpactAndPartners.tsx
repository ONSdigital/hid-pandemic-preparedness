import { RiGlobeLine, RiUserSmileLine, RiUserStarLine } from "@remixicon/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";

import type { ImpactAndPartnersProps } from "./ImpactAndPartners.interface";
import styles from "./ImpactAndPartners.module.scss";

// Set size of icon here using icon component props
const iconSize: string = "2.375rem";

const impactIconMap: Record<string, ReactNode> = {
  experts: <RiUserStarLine size={iconSize} />,
  countries: <RiGlobeLine size={iconSize} />,
  users: <RiUserSmileLine size={iconSize} />,
};

export const ImpactAndPartners: FC<ImpactAndPartnersProps> = (props) => {
  return (
    <div className={clsx("text-center", styles["text-color"])}>
      {/* Impact */}
      <div className={clsx("w-100", styles["impact-bg"], "py-4")}>
        <div className={clsx("container-xl")}>
          <div className={clsx("row")}>
            <h3 className={clsx("heading-m")}>{props.impactTitle}</h3>
          </div>
          <div
            className={clsx(
              "row",
              "row-cols-1",
              "row-cols-lg-3",
              "gx-5",
              "py-4",
            )}
          >
            {props.impactItems.map((item) => (
              <div className={clsx("col")} key={item.id}>
                <p
                  className={clsx(
                    "d-flex",
                    "align-items-center",
                    "justify-content-center",
                  )}
                >
                  <span
                    className={clsx(
                      "rounded-circle",
                      "bg-light",
                      "d-flex",
                      "align-items-center",
                      "justify-content-center",
                      styles["icon-badge-size"],
                    )}
                  >
                    {impactIconMap[item.icon]}
                  </span>
                </p>
                <h4 className={clsx("heading-s", "fw-bold")}>{item.title}</h4>
                <p>{item.subTitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Partners */}
      <div className={clsx("w-100", "py-4")}>
        <div className={clsx("container-xl")}>
          <div className={clsx("row")}>
            <h3 className={clsx("heading-m")}>{props.partnersTitle}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
