import clsx from "clsx";
import type { FC } from "react";

import { Link } from "../../Link/Link";
import type { QuickLinksProps } from "./QuickLinks.interface";

export const QuickLinks: FC<QuickLinksProps> = (props) => {
  return (
    <div className={clsx("w-100", "bg-primary")}>
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
                  "list-group",
                  "list-group-flush",
                  "d-none",
                  "d-md-block",
                )}
              >
                {navItem.children?.map((link) => (
                  <a
                    href={link.href}
                    className={clsx(
                      "text-light",
                      "list-group-item",
                      "list-group-item-action",
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
                label={"View all"}
                textInverse={true}
                className="mt-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
