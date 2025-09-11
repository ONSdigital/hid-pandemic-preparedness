import clsx from "clsx";
import type { FC } from "react";

import type {
  FooterColumnLinksProps,
  FooterColumnTitleBlockProps,
  FooterProps,
} from "./Footer.interface";
import styles from "./Footer.module.scss";

const FooterColumnLinks: FC<FooterColumnLinksProps> = (props) => {
  return (
    <>
      {props.links?.map((link) => (
        <p>
          <a
            className={clsx(
              "fw-light",
              "link-light",
              "link-underline",
              "link-underline-opacity-0",
            )}
            href={link.href}
            aria-disabled={link.disabled}
          >
            {link.label}
          </a>
        </p>
      ))}
    </>
  );
};

/*
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item’s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>


*/

const FooterColumnTitleBlock: FC<FooterColumnTitleBlockProps> = (props) => {
  return (
    <div className={clsx(styles["col-title-block"])}>
      {props.title && <h4 className={clsx("heading-s")}>{props.title}</h4>}
    </div>
  );
};

export const Footer: FC<FooterProps> = (props) => {
  const accordionId: string = "footerAccordion";

  return (
    <footer
      className={clsx(
        "w-100",
        "bg-primary",
        "bg-gradient",
        "text-light",
        "py-4",
      )}
    >
      <div className={clsx("container-xl")}>
        <div className={clsx("row", "row-cols-1", "row-cols-lg-4")}>
          {/* Columns for viewports sm and up first three */}
          {props.columns.slice(0, 3).map((col) => (
            <div className={clsx("col", "d-none", "d-sm-block")} key={col.id}>
              <FooterColumnTitleBlock title={col.title} />
              <FooterColumnLinks links={col.links} />
            </div>
          ))}
          {/* Accordion for viewports sm and down first three */}
          <div className={clsx("accordion", "d-sm-none")} id={accordionId}>
            {props.columns.map((col) => (
              <div className={clsx("accordion-item")}>
                <h4 className={clsx("accordion-header", "heading-s")}>
                  <button
                    className={clsx("accordion-button")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${col.id}`}
                    aria-expanded="true"
                    aria-controls={col.id}
                  >
                    {col.title}
                  </button>
                </h4>
                <div
                  id={col.id}
                  className={clsx("accordion-collapse", "collapse", "show")}
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className={clsx("accordion-body")}>
                    <FooterColumnLinks links={col.links} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={clsx("col")}>
            <FooterColumnTitleBlock
              title={props.columns[props.columns.length - 1].title}
            />
            <FooterColumnLinks
              links={props.columns[props.columns.length - 1].links}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
