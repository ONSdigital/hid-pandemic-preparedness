import type { SubTheme, Theme } from "@src/types/bloks/storyblok-components";

export interface SubThemeItemProps {
  subTheme: SubTheme;
  checked?: boolean;
  onToggle?: (uid: string, checked: boolean) => void;
}

export interface ThemeFilterProps {
  themes?: Theme[];
}

export interface ThemeItemProps {
  theme: Theme;
  onChange?: (filteredTheme: Theme) => void;
}
