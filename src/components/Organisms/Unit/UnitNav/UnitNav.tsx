import type { FC } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import type { ChapterListProps } from "@src/components/Molecules/Core/ChapterList/ChapterList.interface";

import { Accordion } from "@src/components/Accordion/Accordion";
import { ChapterList } from "@src/components/Molecules/Core/ChapterList/ChapterList";
import { IconAndTextLink } from "@src/components/IconAndTextLink/IconAndTextLink";

import strings from "@src/content/strings.json";

import type { UnitNavProps } from "./UnitNav.interface";
import styles from "./UnitNav.module.scss";

export const UnitNav: FC<UnitNavProps> = (props) => {
  // Get all strings from json file
  const unitNavStrings = strings.unit.unitNav;

  const accordionId = uuidv4();
  const accordionItemId = uuidv4();
  const headingText = unitNavStrings.chapters;
  // Build the props for `ChapterList based on incoming stories
  const chapterListProps: ChapterListProps = {
    activeChapterSlug: props.activeChapterSlug,
    parent: {
      _uid: props.parentStory.uuid,
      fullSlug: props.parentStory.full_slug,
      title: props.parentStory.content.title,
    },
    chapters: props.chapterStories.map((story) => ({
      _uid: story.uuid,
      fullSlug: story.full_slug,
      title: story.content.title,
    })),
  };

  const accordionProps = {
    id: accordionId,
    items: [
      {
        id: accordionItemId,
        headerTitle: headingText,
        bodyContent: <ChapterList {...chapterListProps} />,
      },
    ],
  };
  return (
    <div className="w-100">
      <div className={clsx(styles["learning-module-nav__container"])}>
        <div className={clsx("d-flex", "flex-column", "gap-3", "mb-5")}>
          {props.parentStory.content.githubLink && (
            <IconAndTextLink
              href={props.parentStory.content.githubLink.url}
              icon="github"
              label={unitNavStrings.openGithub}
            />
          )}
          <IconAndTextLink
            href="/"
            icon="pdf"
            label={unitNavStrings.downloadPdf}
          />
          <IconAndTextLink
            href="/"
            icon="feedback"
            label={unitNavStrings.feedback}
          />
        </div>

        {/*  Mobile view: chapterList inside accordian */}
        <div className={clsx("d-block", "d-lg-none")}>
          <Accordion {...accordionProps} />
        </div>

        {/* Desktop view: there is no accordian */}
        <div className={clsx("d-lg-block", "d-none")}>
          <h1 className={clsx("heading-xs", "fw-bold", "mb-3")}>
            {headingText}
          </h1>
          <ChapterList {...chapterListProps} />
        </div>
      </div>
    </div>
  );
};
