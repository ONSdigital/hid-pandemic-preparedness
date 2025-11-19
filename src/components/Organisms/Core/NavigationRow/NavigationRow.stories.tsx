import type { Meta, StoryObj } from "@storybook/react";

import type { StoryblokMultilinkUrl } from "@src/types/storyblok";

import { NavigationRow } from "./NavigationRow";
import type { NavigationRowProps } from "./NavigationRow.interface";
import linksJson from "./links.json?raw";

const links: StoryblokMultilinkUrl[] = JSON.parse(linksJson);

const meta = {
  component: NavigationRow,
  title: "Organisms/Core/NavigationRow",
  argTypes: {
    currentFullSlug: {
      control: {
        type: "select",
      },
      options: [...links.map((link) => link.full_slug)],
    },
    links: {
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
  links: links,
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
