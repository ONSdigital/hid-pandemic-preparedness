import clsx from "clsx";
import type { FC } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { ButtonProps } from "@src/components/Button/Button.interface";
import type { Chapter } from "@src/types/Chapter";
import type { CongratulationsProps } from "@/src/components/Molecules/Unit/Congratulations/Congratulations.interface";
import type { LinkProps } from "@src/components/Molecules/Core/Link/Link.interface";
import type { Tag } from "@src/types/Tag";
import type { UnitNavProps } from "@components/Organisms/Unit/UnitNav/UnitNav.interface";

import { Button } from "@src/components/Button/Button";
import { Congratulations } from "@/src/components/Molecules/Unit/Congratulations/Congratulations";
import { DynamicComponent } from "@/src/components/DynamicComponent";
import { Link } from "@src/components/Molecules/Core/Link/Link";
import { UnitNav } from "@components/Organisms/Unit/UnitNav/UnitNav";

import { getTags } from "@src/helpers/getTags";

// Content
import strings from "@src/content/strings.json";

import type { UnitProps } from "./Unit.interface";
import styles from "./Unit.module.scss";

export const Unit: FC<UnitProps> = (props) => {
  const unitStrings = strings.unit;

  // Build props for static subcomponents
  const buttonProps: ButtonProps = {
    ariaLabel: unitStrings.unit.nextChapter,
    children: <>{unitStrings.unit.nextChapter}</>,
    className: "fw-medium",
    type: "button",
    variant: "secondary",
  };
  const congratulationsProps: CongratulationsProps = {
    title: unitStrings.congratulations.title,
    htmlContent: unitStrings.congratulations.htmlContent,
  };
  const linkProps: LinkProps = {
    id: uuidv4(),
    asButton: true,
    buttonVariant: "secondary",
    cached_url: props.story.full_slug,
    fieldtype: "multilink",
    linktype: "url",
    title: unitStrings.unit.endLearning,
    url: props.story.full_slug,
  };

  let unitNavProps: UnitNavProps | null = null;
  let blok: any;

  const chapters = props.story.content.chapters;
  const chapterIds: string[] = chapters.map(({ _uid }: Chapter) => _uid);
  const overviewChapter = chapters.find(
    (chapter: Chapter) => chapter.component === "UnitOverview",
  );
  const tags: Tag[] = getTags(props.story);

  // Initialize selected chapter ID state with overview chapter's _uid or null
  const [selectedChapterId, setSelectedChapterId] = useState(
    chapters.length > 0 && overviewChapter ? overviewChapter._uid : null,
  );

  // Find index of the selected chapter
  const selectedIndex = selectedChapterId
    ? chapterIds.indexOf(selectedChapterId)
    : -1;

  // Set overview chapter boolean if we're on the overview chapter
  const isOverviewChapter: boolean =
    overviewChapter && selectedChapterId === overviewChapter._uid;

  // Set last chapter boolean if we're on the last chapter
  const isLastChapter: boolean =
    selectedChapterId === chapterIds[chapterIds.length - 1];

  // If story contains some chapters including an overview, build the nav props
  if (chapters.length > 1 && overviewChapter) {
    unitNavProps = {
      activeChapterId: selectedChapterId,
      githubLink: overviewChapter.githubLink,
      chapters: chapters.map(({ _uid, title }: Chapter) => ({
        _uid,
        title,
      })),
      onSelect: (id: string) => {
        setSelectedChapterId(id);
      },
    };
  }

  // Find selected chapter object by ID
  const selectedChapter = chapters.find(
    (chapter: Chapter) => chapter._uid === selectedChapterId,
  );

  // Handler for Next button click
  const handleNext = () => {
    if (selectedIndex >= 0 && selectedIndex < chapterIds.length - 1) {
      setSelectedChapterId(chapterIds[selectedIndex + 1]);
    }
  };

  // If we're on the overview, add some additional props otherwise just set blok to chapter
  if (isOverviewChapter) {
    blok = {
      ...selectedChapter,
      startLink: {
        title: strings.unit.overview.start,
        url: props.story.full_slug,
      },
      tags: tags,
      onNext: handleNext,
    };
  } else {
    blok = selectedChapter;
  }

  return (
    <div className={clsx("w-100", styles["container-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3")}>
            {unitNavProps && <UnitNav {...unitNavProps} />}
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            <DynamicComponent blok={blok} />
            {isLastChapter && <Congratulations {...congratulationsProps} />}
            <div className={clsx("d-flex", "justify-content-center")}>
              {isLastChapter ? (
                <Link {...linkProps} />
              ) : (
                // Only render the next button if we're not on the overview
                !isOverviewChapter && (
                  <Button {...buttonProps} onClick={handleNext} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
