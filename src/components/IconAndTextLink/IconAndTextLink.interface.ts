import type { MouseEventHandler } from "react";

import type { LinkData } from "@src/types/LinkData";

export interface IconAndTextLinkInterface extends LinkData {
  href: string;
  icon: "download" | "feedback" | "github" | "restart" | "share";
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
