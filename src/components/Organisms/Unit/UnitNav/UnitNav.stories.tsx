import type { Meta, StoryObj } from "@storybook/react";

// Importing raw here to avoid typescript errors when parsing strings to enums
import unitNavJson from "./unit-nav.json?raw";
import { UnitNav } from "./UnitNav";
import type { UnitNavProps } from "./UnitNav.interface";

const unitNavProps: UnitNavProps = {
  ...JSON.parse(unitNavJson),
};

const meta = {
  argTypes: {
    activeChapterSlug: {
      control: {
        type: "select",
      },
      options: [
        null,
        unitNavProps.parentStory.full_slug,
        ...unitNavProps.chapterStories.map((chapter) => chapter.full_slug),
      ],
    },
    chapterStories: { table: { disable: true } },
    parentStory: { table: { disable: true } },
  },
  component: UnitNav,
  parameters: {
    layout: "centered",
  },
  title: "Organisms/Unit/UnitNav",
} satisfies Meta<typeof UnitNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnitNavStory = {
  args: unitNavProps,
  name: "UnitNav",
} satisfies Story;
