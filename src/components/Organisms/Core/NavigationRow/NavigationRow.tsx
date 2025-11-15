import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@src/components/Molecules/Core/Link/Link";

import styles from "./NavigationRow.module.scss";
import type { NavigationRowProps } from "./NavigationRow.interface";

interface PageNavAttributes {
  cached_url: string;
  id: string;
  label: string;
  url: string;
}

export const NavigationRow: FC<NavigationRowProps> = (props) => {
  let links: PageNavAttributes[] | undefined = [];

  // Build the links from input stories
  props.resolvedLinks.map((link) =>
    links.push({
      cached_url: link.full_slug,
      id: link.uuid,
      label: link.name,
      url: link.full_slug,
    }),
  );

  return (
    <div className={clsx("w-100", styles["child-pages-nav-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        {props.subTitle && (
          <div className={clsx("row", "py-4")}>
            <p>{props.subTitle}</p>
          </div>
        )}
        {/* Only show the links if we have more than one */}
        {links.length > 1 && (
          <nav className={clsx("d-flex", "flex-row", "gap-4")}>
            {links.map((link) => (
              <Link
                {...link}
                asButton={true}
                buttonVariant={
                  link.url === props.currentFullSlug
                    ? "primary"
                    : "primary-inverse"
                }
                fieldtype="multilink"
                hideIcon={true}
                linktype="url"
                key={link.id}
              />
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};
