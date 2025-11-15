import type { Meta, StoryObj } from "@storybook/react";
import type { ISbStoryData } from "@storyblok/js";

import storiesJson from "./stories.json?raw";

import { NavigationRow } from "./NavigationRow";
import type { NavigationRowProps } from "./NavigationRow.interface";

const stories: ISbStoryData[] = JSON.parse(storiesJson);

const meta = {
  component: NavigationRow,
  title: "Organisms/Core/NavigationRow",
  argTypes: {
    currentFullSlug: {
      control: {
        type: "select",
      },
      options: [...stories.map((story) => story.full_slug)],
    },
    parentFullSlug: {
      table: {
        disable: true,
      },
    },
    stories: {
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
  parentFullSlug: "learning-resources/data-analysis/",
  stories: stories,
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
