import type { StoryblokRichTextNode } from "@storyblok/richtext";

import type { Link } from "@src/types/Link";
import type { Tag } from "@src/types/Tag";

export interface UnitOverviewProps {
  title: string;
  readingTime: string;
  overviewRichText: StoryblokRichTextNode;
  githubLink?: Link;
  tags?: Tag[];
  // Prop for handling button click to increment chapter
  onNext: () => void;
}
