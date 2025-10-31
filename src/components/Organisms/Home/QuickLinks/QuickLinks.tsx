import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@components/Molecules/Core/Link/Link";
import { Icon } from "@components/Molecules/Core/Icon/Icon";
import type { QuickLinksProps } from "./QuickLinks.interface";

import styles from "./QuickLinks.module.scss";

export const QuickLinks: FC<QuickLinksProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["quick-links-bg"])}>
      <div className={clsx("container-lg", "text-light", "py-5")}>
        <h4 className={clsx("heading-s")}>{props.title}</h4>
        <p className={clsx("mb-0", "mt-4")}>{props.subTitle}</p>

        <div className={clsx("d-flex", "flex-wrap", "gap-4", "mt-4")}>
          {props.links.map((linkItem) => (
            <div
              key={linkItem.link.id}
              className={clsx("d-inline-flex", "align-items-center", "gap-2")}
            >
              {linkItem.icon && (
                <div
                  className={clsx(
                    "d-flex",
                    "align-items-center",
                    "justify-content-center",
                    "rounded-1",
                    styles["icon-bg"],
                  )}
                >
                  <Icon
                    iconName={linkItem.icon}
                    className={clsx(styles["icon"])}
                  />
                </div>
              )}

              <Link
                textInverse={true}
                className={clsx("fw-semibold", styles["link-color"])}
                label={linkItem.link.story?.name}
                {...linkItem.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
