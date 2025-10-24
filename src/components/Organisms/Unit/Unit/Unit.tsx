import clsx from "clsx";
import type { FC } from "react";
import { useState } from "react";

import type { CongratulationsProps } from "@/src/components/Molecules/Unit/Congratulations/Congratulations.interface";
import type { UnitNavProps } from "@components/Organisms/Unit/UnitNav/UnitNav.interface";

import { Congratulations } from "@/src/components/Molecules/Unit/Congratulations/Congratulations";
import { DynamicComponent } from "@/src/components/DynamicComponent";
import { UnitNav } from "@components/Organisms/Unit/UnitNav/UnitNav";

// Content
import strings from "@src/content/strings.json";

import type { UnitProps } from "./Unit.interface";
import styles from "./Unit.module.scss";

export const Unit: FC<UnitProps> = (props) => {
  let congratulationsProps: CongratulationsProps | null = null;
  let unitNavProps: UnitNavProps | null = null;

  const chapters = props.story.content.chapters;
  const chapterIds: string[] = chapters.map(({ _uid }) => _uid);
  const overviewChapter = chapters.find(
    (chapter) => chapter.component === "UnitOverview",
  );

  // Initialize selected chapter ID state with overview chapter's _uid or null
  const [selectedChapterId, setSelectedChapterId] = useState(
    chapters.length > 0 && overviewChapter ? overviewChapter._uid : null,
  );

  // Set last chapter boolean if we're on the last chapter
  const lastChapter: boolean =
    selectedChapterId === chapterIds[chapterIds.length - 1];

  // If story contains some chapters including an overview, build the nav props
  if (chapters.length > 1 && overviewChapter) {
    unitNavProps = {
      activeChapterId: selectedChapterId,
      githubLink: overviewChapter.githubLink,
      chapters: chapters.map(({ _uid, title }) => ({
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
    (chapter) => chapter._uid === selectedChapterId,
  );

  // Create the congratulations props for use if appropriate
  if (lastChapter) {
    const congratulationsStrings = strings.unit.congratulations;
    congratulationsProps = {
      title: congratulationsStrings.title,
      htmlContent: congratulationsStrings.htmlContent,
    };
  }

  // Build the link

  return (
    <div className={clsx("w-100", styles["container-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3")}>
            {unitNavProps && <UnitNav {...unitNavProps} />}
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            <DynamicComponent blok={selectedChapter} />
            {congratulationsProps && (
              <Congratulations {...congratulationsProps} />
            )}
            <div className={clsx("d-flex", "justify-content-center")}>
              {/* <LinkComponent {...link} asButton={true} buttonVariant="secondary" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
