import type { Meta, StoryObj } from "@storybook/react";

import imageAndTextData from "../../../content/Home/imageAndText.json";
import { ImageAndText } from "./ImageAndText";
import type { ImageAndTextProps } from "./ImageAndText.interface";

const meta = {
  component: ImageAndText,
  title: "Organisms/Home/ImageAndText",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
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
