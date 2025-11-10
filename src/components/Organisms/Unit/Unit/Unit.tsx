import { RiArrowRightLine } from "@remixicon/react";
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
import { Link } from "@src/components/Molecules/Core/Link/Link";
import { UnitChapter } from "@components/Organisms/Unit/UnitChapter/UnitChapter";
import { UnitNav } from "@components/Organisms/Unit/UnitNav/UnitNav";
import { UnitOverview } from "@components/Organisms/Unit/UnitOverview/UnitOverview";

import { getTags } from "@src/helpers/getTags";

// Content
import strings from "@src/content/strings.json";

import type { UnitProps } from "./Unit.interface";
import styles from "./Unit.module.scss";

export const Unit: FC<UnitProps> = ({ story }) => {
  // Initialize vars
  let blok: any;
  let chapters = story.content.chapters;
  let chapterIds: string[] | null = null;
  let isLastChapter: boolean | null = null;
  let isOverviewChapter: boolean | null = null;
  let overviewChapter: Chapter | null = null;
  const parentSlug: string = story.full_slug.substring(
    0,
    story.full_slug.length - story.slug.length,
  );
  let selectedChapter: Chapter | null = null;
  let selectedIndex: number;
  let unitNavProps: UnitNavProps | null = null;
  const unitStrings = strings.unit;

  // Build the chapters if we have some valid data
  if (chapters) {
    chapterIds = chapters.map(({ _uid }: Chapter) => _uid);
    overviewChapter = chapters.find(
      (chapter: Chapter) => chapter.component === "UnitOverview",
    );
  }

  const tags: Tag[] = getTags(story);

  // Initialize selected chapter ID state with overview chapter's _uid or null
  const [selectedChapterId, setSelectedChapterId] = useState(
    overviewChapter ? overviewChapter._uid : "",
  );

  if (chapterIds) {
    // Find index of the selected chapter
    selectedIndex = selectedChapterId
      ? chapterIds.indexOf(selectedChapterId)
      : -1;
    // Set overview chapter boolean if we're on the overview chapter
    isOverviewChapter =
      overviewChapter && selectedChapterId === overviewChapter._uid;
    // Set last chapter boolean if we're on the last chapter not including the overview
    isLastChapter =
      !isOverviewChapter &&
      selectedChapterId === chapterIds[chapterIds.length - 1];
    // Find selected chapter object by ID
    selectedChapter = chapters.find(
      (chapter: Chapter) => chapter._uid === selectedChapterId,
    );
  }

  // If story contains some chapters including an overview, build the nav props
  if (chapters && overviewChapter) {
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

  // Handler for Next button click
  const handleNext = () => {
    if (chapterIds) {
      if (selectedIndex >= 0 && selectedIndex < chapterIds.length - 1) {
        setSelectedChapterId(chapterIds[selectedIndex + 1]);
      }
    }
  };

  // If we're on the overview, add some additional props otherwise just set blok to chapter
  if (isOverviewChapter) {
    blok = {
      ...selectedChapter,
      startLink: {
        title: strings.unit.overview.start,
        url: story.full_slug,
      },
      tags: tags,
      onNext: handleNext,
    };
  } else {
    blok = selectedChapter;
  }

  // Build props for static subcomponents
  const buttonProps: ButtonProps = {
    ariaLabel: unitStrings.unit.nextChapter,
    children: (
      <>
        {unitStrings.unit.nextChapter} <RiArrowRightLine />
      </>
    ),
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
    cached_url: parentSlug,
    fieldtype: "multilink",
    linktype: "url",
    title: unitStrings.unit.endLearning,
    url: parentSlug,
  };

  return (
    <div
      className={clsx("w-100", styles["container-bg"])}
      data-testid={"unit-container"}
    >
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3")}>
            {unitNavProps && <UnitNav {...unitNavProps} />}
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            {blok && (
              <>
                {blok.component === "UnitOverview" ? (
                  <UnitOverview {...blok} />
                ) : (
                  <UnitChapter {...blok} />
                )}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
