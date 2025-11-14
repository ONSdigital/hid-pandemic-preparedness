import type { LinkData } from "../../types/LinkData";

export interface IconAndTextLinkInterface extends LinkData {
  href: string;
  icon: "download" | "feedback" | "github" | "restart" | "share";
  label: string;
}
