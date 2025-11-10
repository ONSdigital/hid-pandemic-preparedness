import type { Link } from "@localTypes/Link";

export interface Chapter {
  _uid: string;
  title: string;
  component?: string;
  githubLink?: Link;
}
