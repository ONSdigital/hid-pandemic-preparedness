import type { SubTheme } from "@src/types/bloks/storyblok-components";

export interface SubThemeProps extends SubTheme {
  parentTheme?: string;
}
