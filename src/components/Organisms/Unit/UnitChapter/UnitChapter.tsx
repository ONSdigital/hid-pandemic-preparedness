import clsx from "clsx";
import type { FC } from "react";

import { TextModule } from "@components/Molecules/Core/TextModule/TextModule";
import { Accordion } from "@components/Accordion/Accordion";
import type { AccordionProps } from "@components/Accordion/Accordion.interface";

import styles from "./UnitChapter.module.scss";
import type { UnitChapterProps } from "./UnitChapter.interface";

export const UnitChapter: FC<UnitChapterProps> = (props) => {
  let accordionProps = null;

  if (props.sections) {
    accordionProps = {
      id: props._uid,
      items: props.sections.map((section) => ({
        id: section._uid,
        headerTitle: section.title,
        bodyContent: <TextModule richText={section.contentRichText} />,
      })),
      expandAll: true,
    };
  }

  return (
    <div className={clsx("w-100", styles["container"])}>
      <div className={clsx("px-2", "py-4", "p-lg-4")}>
        {accordionProps && (
          <Accordion
            {...(accordionProps as AccordionProps)}
            variant="primary"
          />
        )}
      </div>
    </div>
  );
};
