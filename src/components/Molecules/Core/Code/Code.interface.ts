import type { Code, CodeLanguage } from "@src/types/bloks/storyblok-components";

export interface CodeProps extends Code {}

export interface ToggleSwitchProps {
    languages: CodeLanguage[];
    selectedId: number;
    // eslint-disable-next-line no-unused-vars
    toggle: (option: number) => void;
}
