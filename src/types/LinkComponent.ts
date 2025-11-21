import type { StoryblokMultilink } from "@src/types/storyblok";

export interface LinkComponent {
  _uid: string;
  label?: string;
  link: StoryblokMultilink;
}
