import type { Link } from "@src/types/Link";

export interface Chapter {
  _uid: string;
  title: string;
  component?: string;
  githubLink?: Link;
}
