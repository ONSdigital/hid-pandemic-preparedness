import type { StoryblokMultilink } from "@src/types/storyblok";

export interface LinkProps extends StoryblokMultilink {
  asButton?: boolean;
  buttonVariant?:
    | "navigation-tab"
    | "navigation-tab-inverse"
    | "primary"
    | "primary-inverse"
    | "secondary"
    | "secondary-inverse";
  className?: string;
  disabled?: boolean;
  goBack?: boolean;
  textInverse?: boolean;
  label?: string;
  hideIcon?: boolean;
}
