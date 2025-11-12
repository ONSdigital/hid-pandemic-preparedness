import type { SubTheme, Theme } from "@src/types/bloks/storyblok-components";

export interface SubThemeItemProps {
  subTheme: SubTheme;
  onToggle?: (uid: string, checked: boolean) => void;
}

export interface ThemeFilterProps {
  themes?: Theme[];
}
