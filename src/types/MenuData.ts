import type { Link } from "./Link";

export interface MenuData {
  _uid: string;
  links: Link[];
  title?: string;
}
