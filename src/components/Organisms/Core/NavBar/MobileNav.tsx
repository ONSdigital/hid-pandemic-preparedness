import { useState, type FC } from "react";
import clsx from "clsx";

import { Image } from "@components/Molecules/Core/Image/Image";

import type { MobileNavProps } from "./NavBar.interface";
import { MegaMenu } from "@components/MegaMenu/MegaMenu";
import { Accordion } from "@components/Molecules/Core/Accordion/Accordion";
import { SearchBar } from "@components/Molecules/SearchBar/SearchBar";
import { Link } from "@components/Molecules/Core/Link/Link";

export const MobileNav: FC<MobileNavProps> = (props) => {
  const hasExpandableItems =
    props.expandableItems && props.expandableItems.length > 0;
  const hasLinks = props.links && props.links.length > 0;

  const accordionItems = hasExpandableItems
    ? props.expandableItems.map((expandableItem) => ({
        id: expandableItem._uid,
        headerTitle: expandableItem.label,
        bodyContent: <MegaMenu {...expandableItem.MegaMenu[0]} />,
      }))
    : [];

  const [showNavContent, setShowNavContent] = useState<boolean>(false);

  const toggleNavContent = () => {
    setShowNavContent((prev) => !prev);
  };

  return (
    <>
      <div>
        <Image {...props.logo} />
        <button onClick={toggleNavContent}>Hello</button>
      </div>
      {/* Toggable content */}
      {showNavContent && (
        <div className={clsx("d-flex", "flex-column", "gap-3", "px-1", "py-3")}>
          <SearchBar placeholder="TODO searchBar" />
          {hasExpandableItems && (
            <Accordion
              id="mobileNavAccordion"
              items={accordionItems}
              variant="primary"
            />
          )}
          <div className={clsx("d-flex", "flex-column", "gap-3", "px-4")}>
            {hasLinks &&
              props.links.map((navBarLink) => (
                <Link
                  key={navBarLink._uid}
                  {...navBarLink.link}
                  label={navBarLink.label}
                  textInverse={true}
                  hideIcon={true}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};
