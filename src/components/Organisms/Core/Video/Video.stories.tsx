import type { Meta, StoryObj } from "@storybook/react";

import videoData from "./video.json?raw";
import { Video } from "./Video";
import type { VideoProps } from "./Video.interface";

const meta = {
  component: Video,
  title: "Organisms/Core/Video",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VideoStory = {
  name: "Video",
  args: JSON.parse(videoData) as VideoProps,
} satisfies Story;
