import clsx from "clsx";
import type { FC } from "react";
import { useState } from "react";

// import { Congratulations } from "@components/Congratulations/Congratulations";

import type { UnitNavProps } from "@components/Organisms/Unit/UnitNav/UnitNav.interface";

import { DynamicComponent } from "@/src/components/DynamicComponent";
import { UnitNav } from "@components/Organisms/Unit/UnitNav/UnitNav";
// import { Link } from "@components/Link/Link";

import type { UnitProps } from "./Unit.interface";
import styles from "./Unit.module.scss";

export const Unit: FC<UnitProps> = (props) => {
  let unitNavProps: UnitNavProps | null = null;

  const chapters = props.story.content.chapters;
  const overviewChapter = chapters.find(
    (chapter) => chapter.component === "UnitOverview",
  );

  // Initialize selected chapter ID state with overview chapter's _uid or null
  const [selectedChapterId, setSelectedChapterId] = useState(
    chapters.length > 0 && overviewChapter ? overviewChapter._uid : null,
  );

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

  return (
    <div className={clsx("w-100", styles["container-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3")}>
            {unitNavProps && <UnitNav {...unitNavProps} />}
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            <DynamicComponent blok={selectedChapter} />
          </div>
        </div>
      </div>
    </div>
  );
};
