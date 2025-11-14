import type { LinkComponent } from "./LinkComponent";

export interface LinkList {
  _uid: string;
  title?: string;
  links: LinkComponent[];
}
