import clsx from "clsx";
import type { FC } from "react";
import slugify from "slugify";

import { Accordion } from "@src/components/Molecules/Core/Accordion/Accordion";
import { Introduction } from "@components/Molecules/Unit/Introduction/Introduction";
import { TextModule } from "@components/Molecules/Core/TextModule/TextModule";

import styles from "./UnitChapter.module.scss";
import type { UnitChapterProps } from "./UnitChapter.interface";

export const UnitChapter: FC<UnitChapterProps> = (props) => {
  let accordionProps = undefined;
  let sectionLinks = undefined;

  // Build accordion props and section links only if sections exist
  if (props.sections) {
    accordionProps = {
      id: props._uid,
      items: props.sections.map((section) => {
        return {
          id: slugify(section.title, { lower: true }),
          headerTitle: section.title,
          bodyContent: <TextModule richText={section.contentRichText} />,
        };
      }),
      expandAll: true,
    };
    sectionLinks = props.sections.map((section) => {
      const slug = slugify(section.title, { lower: true });
      return {
        id: section._uid,
        fieldtype: "multilink",
        linktype: "url",
        title: section.title,
        cached_url: slug,
        url: slug,
      };
    });
  }

  return (
    <div
      className={clsx(
        "container",
        "w-100",
        "col-md-9",
        "d-flex",
        "flex-column",
        "gap-4",
      )}
    >
      <Introduction
        title={props.title}
        subTitle={props.subTitle}
        sectionLinks={sectionLinks}
      />
      <div className={clsx(styles["container"])}>
        <div className={clsx("px-2", "py-4", "p-lg-4")}>
          {accordionProps && (
            <Accordion {...accordionProps} variant="primary" />
          )}
        </div>
      </div>
      {/* {props.currentChapter === props.totalChapters && (
        <Congratulations
          title={props.congratulations.title}
          htmlContent={props.congratulations.htmlContent}
        />
      )} */}
      <div className={clsx("d-flex", "justify-content-center")}>
        {/* <Link {...props.link} asButton={true} buttonVariant="secondary" /> */}
      </div>
    </div>
  );
};
