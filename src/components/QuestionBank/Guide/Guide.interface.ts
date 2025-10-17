import type { TextModuleProps } from "@components/Molecules/Core/TextModule/TextModule.interface";
import type { LinkData } from "@localTypes/LinkData";

export interface GuideProps {
  topTitle: string;
  topContent: TextModuleProps;
  topLink: LinkData;
  bottomTitle: string;
  bottomContent: TextModuleProps;
  bottomLink: LinkData;
}
