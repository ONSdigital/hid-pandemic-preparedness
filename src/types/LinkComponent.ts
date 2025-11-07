import type { Link } from "./Link";

export interface LinkComponent {
  _uid: string;
  label?: string;
  link: Link;
}
