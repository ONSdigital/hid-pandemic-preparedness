import type { StoryBlokLink } from "@localTypes/StoryBlokLink";

export interface LinkProps extends StoryBlokLink {
  asButton?: boolean;
  buttonVariant?:
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
