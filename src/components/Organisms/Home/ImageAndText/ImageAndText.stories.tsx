import type { Meta, StoryObj } from "@storybook/react";

import imageAndTextData from "./image-and-test.json";
import { ImageAndText } from "./ImageAndText";
import type { ImageAndTextProps } from "./ImageAndText.interface";

const meta = {
  component: ImageAndText,
  title: "Organisms/Home/ImageAndText",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
    image: {
      table: {
        disable: true,
      },
    },
    link: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ImageAndText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderStory = {
  name: "ImageAndText",
  args: { ...imageAndTextData } as ImageAndTextProps,
} satisfies Story;
