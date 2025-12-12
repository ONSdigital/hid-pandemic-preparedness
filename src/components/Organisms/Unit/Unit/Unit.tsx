import { RiArrowRightLine } from "@remixicon/react";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useState } from "react";
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
import slugify from "slugify";

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

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.substring(1);
      if (!rawHash || !chapters) return;

      // Decode where browser encoding may cause mismatch
      const hash = decodeURIComponent(rawHash);

      // Find match
      const targetChapter = chapters.find(
        (ch: Chapter) => slugify(ch.title, { lower: true }) === hash,
      );

      if (targetChapter && targetChapter._uid !== selectedChapterId) {
        setSelectedChapterId(targetChapter._uid);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    handleHashChange();

    // Run on navigation
    window.addEventListener("hashchange", handleHashChange);

    // clean up
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [chapters]);

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

        const chapter = chapters.find((c: Chapter) => c._uid === id);
        if (chapter) {
          history.pushState(
            null,
            "",
            `#${slugify(chapter.title, { lower: true })}`,
          );
        }
      },
    };
  }

  // Handler for Next button click
  const handleNext = () => {
    if (chapterIds) {
      if (selectedIndex >= 0 && selectedIndex < chapterIds.length - 1) {
        const nextId = chapterIds[selectedIndex + 1];
        setSelectedChapterId(nextId);
        window.scrollTo({ top: 0, behavior: "instant" });
        
        // Make the body focusable and set focus to it to reset focus when changing chapters
        document.body.tabIndex = -1;
        document.body.focus()

        const nextChapter = chapters.find((c: Chapter) => c._uid === nextId);
        if (nextChapter) {
          history.pushState(
            null,
            "",
            `#${slugify(nextChapter.title, { lower: true })}`,
          );
        }
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
      <div className={clsx("container-lg", "py-4", "py-lg-5")}>
        <div className={clsx("row", "py-md-4")}>
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
