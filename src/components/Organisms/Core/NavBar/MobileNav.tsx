import { useState, type FC } from "react";

import { Image } from "@components/Molecules/Core/Image/Image";

import type { MobileNavProps } from "./NavBar.interface";
import { MegaMenu } from "@components/MegaMenu/MegaMenu";
import { Accordion } from "@components/Molecules/Core/Accordion/Accordion";
import { SearchBar } from "@components/Molecules/SearchBar/SearchBar";

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
    console.log("Toggled nav content");
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
        <div>
          <SearchBar placeholder="TODO searchBar" />
          {hasExpandableItems && (
            <Accordion
              id="mobileNavAccordion"
              items={accordionItems}
              variant="primary"
            />
          )}
          {hasLinks &&
            props.links.map((item) => <h1 key={item._uid}>{item.label}</h1>)}
        </div>
      )}
    </>
  );
};
