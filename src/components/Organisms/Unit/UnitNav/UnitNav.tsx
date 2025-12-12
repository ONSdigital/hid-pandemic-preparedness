import type { FC } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import { Accordion } from "@src/components/Molecules/Core/Accordion/Accordion";
import { ChapterList } from "@src/components/Molecules/Core/ChapterList/ChapterList";
import { IconAndTextLink } from "@src/components/Molecules/Core/IconAndTextLink/IconAndTextLink";

import strings from "@src/content/strings.json";

import type { UnitNavProps } from "./UnitNav.interface";
import styles from "./UnitNav.module.scss";

export const UnitNav: FC<UnitNavProps> = (props) => {
  // Get all strings from json file
  const unitNavStrings = strings.unit.unitNav;

  const accordionId = uuidv4();
  const accordionItemId = uuidv4();
  const headingText = unitNavStrings.chapters;

  const handleChapterSelect = (id: string) => {
    if (props.onSelect) {
      props.onSelect(id);
      window.scrollTo({ top: 0, behavior: "instant" }); //Move to the top of the screen when chapter is selected

      // Make the body focusable and set focus to it to reset focus when changing chapters
      document.body.tabIndex = -1;
      document.body.focus();
    }
  };

  const accordionProps = {
    id: accordionId,
    items: [
      {
        id: accordionItemId,
        headerTitle: headingText,
        bodyContent: (
          <ChapterList
            chapters={props.chapters}
            activeId={props.activeChapterId && props.activeChapterId}
            onSelect={handleChapterSelect}
          />
        ),
      },
    ],
  };

  return (
    <div className={clsx("w-100", "h-100")}>
      <div className={clsx("h-100", styles["learning-module-nav__container"])}>
        <div className={clsx("d-flex", "flex-column", "gap-3", "mb-5")}>
          {props.githubLink && (
            <IconAndTextLink
              link={props.githubLink}
              icon="github"
              label={unitNavStrings.openGithub}
            />
          )}
          <IconAndTextLink icon="download" label={unitNavStrings.downloadPdf} />
        </div>

        {/*  Mobile view: chapterList inside accordian */}
        <div className={clsx("d-block", "d-md-none", "mb-4")}>
          <Accordion {...accordionProps} />
        </div>

        {/* Desktop view: there is no accordian */}
        <div
          className={clsx("d-md-block", "d-none", styles["sticky-chapters"])}
        >
          <h1 className={clsx("heading-xs", "fw-bold", "mb-3")}>
            {headingText}
          </h1>
          <ChapterList
            chapters={props.chapters}
            activeId={props.activeChapterId && props.activeChapterId}
            onSelect={handleChapterSelect}
          />
        </div>
      </div>
    </div>
  );
};
