import type { ISbStoryData } from "storyblok-js-client";

import type { Link } from "@src/types/Link";

export interface UnitNavProps {
  stories: ISbStoryData[];
  githubLink?: Link;
}
