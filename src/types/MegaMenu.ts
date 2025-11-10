import type { StoryblokRichTextNode } from "@storyblok/richtext";

import type { LinkList } from "./LinkList";

export interface MegaMenu {
  _uid: string;
  overview: StoryblokRichTextNode;
  columns: LinkList[];
}
