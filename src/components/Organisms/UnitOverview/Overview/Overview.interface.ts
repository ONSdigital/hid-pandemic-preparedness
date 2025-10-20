import type { StoryblokRichTextNode } from "@storyblok/astro";

import type { Link } from "@src/types/Link";
import type { Tag } from "@src/types/Tag";

export interface OverviewProps {
  readingTime: string;
  overviewRichText: StoryblokRichTextNode;
  githubLink: Link;
  startLink?: Link;
  tags?: Tag[];
}
