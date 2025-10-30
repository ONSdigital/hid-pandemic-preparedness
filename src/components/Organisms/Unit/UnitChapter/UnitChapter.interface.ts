import type { StoryblokRichTextNode } from "@storyblok/richtext";

interface UnitSection {
  _uid: string;
  title: string;
  contentRichText: StoryblokRichTextNode;
}

export interface UnitChapterProps {
  _uid: string;
  title: string;
  subTitle: string;
  sections?: UnitSection[];
}
