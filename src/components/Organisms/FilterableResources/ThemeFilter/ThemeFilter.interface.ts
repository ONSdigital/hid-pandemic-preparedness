import type { Control } from "react-hook-form";

import type { SubTheme, Theme } from "@src/types/bloks/storyblok-components";

export interface SubThemeItemProps {
  subTheme: SubTheme;
  control: Control<any>;
}

export interface ThemeFilterProps {
  themes?: Theme[];
  onFilteredThemesChange?: (filteredThemes: Theme[]) => void;
}

export interface ThemeItemProps {
  theme: Theme;
  control: Control<any>;
  setValue: (name: string, value: boolean) => void;
}
