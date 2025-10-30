import type { Meta, StoryObj } from "@storybook/react";

import { UnitChapter } from "./UnitChapter";
// Importing raw here to avoid typescript errors when parsing strings to enums
import unitChapterJson from "./unit-chapter.json?raw";

const meta = {
  component: UnitChapter,
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
  title: "Organisms/Unit/UnitChapter",
} satisfies Meta<typeof UnitChapter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IntroductionStory = {
  name: "UnitChapter",
  args: JSON.parse(unitChapterJson),
} satisfies Story;
