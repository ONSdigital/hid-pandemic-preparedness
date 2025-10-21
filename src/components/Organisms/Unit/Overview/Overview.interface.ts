import type { StoryblokRichTextNode } from "@storyblok/richtext";

import type { Link } from "@src/types/Link";
import type { Tag } from "@src/types/Tag";

export interface OverviewProps {
  title: string;
  readingTime: string;
  overviewRichText: StoryblokRichTextNode;
  githubLink: Link;
  startLink?: Link;
  tags?: Tag[];
}
