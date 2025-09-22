import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@components/Link/Link";
import type { QuickLinksProps } from "./QuickLinks.interface";

import styles from "./QuickLinks.module.scss";

export const QuickLinks: FC<QuickLinksProps> = (props) => {
  const itemsPerList = 2;
  const viewAllString: string = "View all";

  return (
    <div className={clsx("w-100", styles["quick-links-bg"])}>
      <div className={clsx("container-lg", "text-light", "py-4")}>
        <div className={clsx("row")}>
          <h4 className={clsx("heading-s")}>{props.title}</h4>
        </div>
        <div className={clsx("row", "row-cols-1", "row-cols-lg-5")}>
          {props.navItems.map((navItem) => (
            <div
              className={clsx("col", "py-3", "d-flex", "flex-column")}
              key={navItem.id}
            >
              <p className={clsx("fw-bold")}>{navItem.label}</p>
              <div
                className={clsx(
                  "d-none",
                  "d-md-block",
                  "list-group",
                  "list-group-flush",
                  "pb-4",
                )}
              >
                {navItem.children?.slice(0, itemsPerList).map((link) => (
                  <a
                    href={link.href}
                    className={clsx(
                      "body-regular",
                      "text-light",
                      "list-group-item",
                      "list-group-item-action",
                      "py-2",
                      link.disabled && "disabled",
                    )}
                    key={link.id}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <Link
                href={"/"}
                label={viewAllString}
                textInverse={true}
                className={clsx("mt-auto", styles["link-color"])}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
