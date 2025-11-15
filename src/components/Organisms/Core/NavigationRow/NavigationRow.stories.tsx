import type { Meta, StoryObj } from "@storybook/react";

import type { StoryblokMultilinkUrl } from "@src/types/storyblok";

import { NavigationRow } from "./NavigationRow";
import type { NavigationRowProps } from "./NavigationRow.interface";
import resolvedLinksJson from "./resolvedLinks.json?raw";

const resolvedLinks: StoryblokMultilinkUrl[] = JSON.parse(resolvedLinksJson);

const meta = {
  component: NavigationRow,
  title: "Organisms/Core/NavigationRow",
  argTypes: {
    currentFullSlug: {
      control: {
        type: "select",
      },
      options: [...resolvedLinks.map((link) => link.full_slug)],
    },
    resolvedLinks: {
      table: {
        disable: true,
      },
    },
    subTitle: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof NavigationRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const childPagesNavProps: NavigationRowProps = {
  currentFullSlug: "learning-resources/data-analysis/",
  resolvedLinks: resolvedLinks,
};

export const NavigationRowStory = {
  name: "Rendered without sub-title",
  args: childPagesNavProps,
} satisfies Story;

export const NavigationRowStoryWithSubTitle = {
  name: "Rendered with sub-title",
  args: {
    ...childPagesNavProps,
    subTitle:
      "Grouped into themes and modules, with multiple units within each.",
  },
} satisfies Story;
