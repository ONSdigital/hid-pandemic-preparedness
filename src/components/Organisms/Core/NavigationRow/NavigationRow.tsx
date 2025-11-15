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

  if (props.stories) {
    // Build the links from input stories
    props.stories.map((story) =>
      links.push({
        cached_url: story.full_slug,
        id: story.uuid,
        label: story.name,
        url: story.full_slug,
      }),
    );
  }

  return (
    <div className={clsx("w-100", styles["child-pages-nav-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        {props.subTitle && (
          <div className={clsx("row", "py-4")}>
            <p>{props.subTitle}</p>
          </div>
        )}
        {links && (
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
