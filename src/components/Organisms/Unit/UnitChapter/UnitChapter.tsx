import clsx from "clsx";
import type { FC } from "react";
import slugify from "slugify";

import { Introduction } from "@components/Molecules/Unit/Introduction/Introduction";
import { TextModule } from "@components/Molecules/Core/TextModule/TextModule";

import styles from "./UnitChapter.module.scss";
import type {
  ChaptersAccordionsProps,
  UnitChapterProps,
} from "./UnitChapter.interface";

export const UnitChapter: FC<UnitChapterProps> = (props) => {
  let accordionItems = undefined;
  let sectionLinks = undefined;

  // Build accordion props and section links only if sections exist
  if (props.sections) {
    accordionItems = props.sections.map((section) => ({
      id: section._uid,
      headerTitle: section.title ?? "",
      bodyContent: <TextModule richText={section.contentRichText} />,
    }));

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
          {accordionItems && <ChaptersAccordion items={accordionItems} />}
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

export const ChaptersAccordion: FC<ChaptersAccordionsProps> = (props) => {
  const accordionId = "chaptersAccordions";
  return (
    <div
      className={clsx(
        "accordion",
        "accordion-flush",
        "d-flex",
        "flex-column",
        "gap-4",
      )}
      id={accordionId}
    >
      {props.items.map((item) => (
        <div className={clsx("accordion-item")} key={item.id}>
          <h2 className="accordion-header">
            <button
              id={`heading-${item.id}`}
              aria-expanded="false"
              aria-controls={item.id}
              className={clsx(
                "accordion-button",
                "heading-s",
                "text-light",
                "collapsed",
                "mb-0",
                styles["chapters-accordion-heading"],
              )}
              data-bs-target={`#${item.id}`}
              data-bs-toggle="collapse"
              type="button"
            >
              {item.headerTitle}
            </button>
          </h2>
          <div
            id={item.id}
            aria-labelledby={`heading-${item.id}`}
            className={clsx("accordion-collapse", "collapse")}
            data-bs-parent={`#${accordionId}`}
          >
            <div>{item.bodyContent}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
