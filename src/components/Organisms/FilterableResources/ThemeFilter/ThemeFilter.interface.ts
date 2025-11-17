import type { Control } from "react-hook-form";

import type { StoryblokAsset } from "@src/types/storyblok";
import type { SubTheme, Theme } from "@src/types/bloks/storyblok-components";

export interface SubThemeItemProps {
  subTheme: SubTheme;
  control: Control<any>;
}

export interface ThemeFilterProps {
  themes?: Theme[];
  file?: StoryblokAsset;
  onFilteredThemesChange?: (filteredThemes: Theme[]) => void; // eslint-disable-line no-unused-vars
  onSubThemesSelected?: (selected: boolean) => void; // eslint-disable-line no-unused-vars
}

export interface ThemeItemProps {
  theme: Theme;
  control: Control<any>;
  setValue: (name: string, value: boolean) => void; // eslint-disable-line no-unused-vars
}
