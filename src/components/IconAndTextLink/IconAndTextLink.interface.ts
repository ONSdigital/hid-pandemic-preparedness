import type { LinkData } from "../../types/LinkData";

export interface IconAndTextLinkInterface extends LinkData {
  href: string;
  icon: "github" | "pdf" | "feedback" | "share" | "reset";
  label: string;
}
