import type { FC } from "react";

import { Image } from "@components/Molecules/Core/Image/Image";

import type { MobileNavProps } from "./NavBar.interface";
import { MegaMenu } from "@components/MegaMenu/MegaMenu";
import { Accordion } from "@components/Molecules/Core/Accordion/Accordion";

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

  return (
    <div>
      <Image {...props.logo} />
      {hasExpandableItems && (
        <Accordion id="mobileNavAccordion" items={accordionItems} />
      )}
      {hasLinks &&
        props.links.map((item) => <h1 key={item._uid}>{item.label}</h1>)}
    </div>
  );
};
