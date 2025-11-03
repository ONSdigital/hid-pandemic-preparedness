import type { Link } from "./Link";

export interface LinkList {
  _uid: string;
  title?: string;
  links: Link[];
}
