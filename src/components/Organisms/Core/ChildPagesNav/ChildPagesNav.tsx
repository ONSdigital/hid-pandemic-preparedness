import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@src/components/Molecules/Core/Link/Link";

import styles from "./ChildPagesNav.module.scss";
import type { ChildPagesNavProps } from "./ChildPagesNav.interface";

interface PageNavAttributes {
  cached_url: string;
  id: string;
  label: string;
  url: string;
}

export const ChildPagesNav: FC<ChildPagesNavProps> = (props) => {
  let links: PageNavAttributes[] | undefined = [];

  // Arrange the stories and build data for links if required
  if (props.stories) {
    // Find the parent story first
    const parentStory = props.stories.find(
      (story) => story.full_slug === props.parentFullSlug,
    );

    // If the parent page story exists, save the data we need to a new object as first link
    if (parentStory) {
      links.push({
        cached_url: parentStory.full_slug,
        id: parentStory.uuid,
        label: parentStory.name,
        url: parentStory.full_slug,
      });

      // Build the remaining links sorted alphabetically
      props.stories
        .filter((story) => story.name !== parentStory.name)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((story) =>
          links.push({
            cached_url: story.full_slug,
            id: story.uuid,
            label: story.name,
            url: story.full_slug,
          }),
        );
    }
  }

  return (
    <div className={clsx("w-100", styles["child-pages-nav-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        {props.subTitle && (
          <div className={clsx("row", "py-4")}>
            <p>{props.subTitle}</p>
          </div>
        )}
        {/* Only render links if we've got a least one child */}
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
