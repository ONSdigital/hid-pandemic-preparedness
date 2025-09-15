import type { Meta, StoryObj } from "@storybook/react";

import markdownContent from "../../content/text-module-content.md?raw";
import { parseMarkdown } from "../../helpers/parseMarkdown";
import { TextModule } from "./TextModule";
import type { TextModuleProps } from "./TextModule.interface";

const meta = {
  component: TextModule,
  title: "Components/TextModule",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    htmlContent: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof TextModule>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse and sanitize markdown to html
const htmlContent = await parseMarkdown(markdownContent);

const textModuleProps: TextModuleProps = {
  htmlContent: htmlContent,
  // Adding classname here just for storybook integration
  className: "container-lg",
};

export const HeaderStory = {
  name: "Text Module",
  args: textModuleProps,
} satisfies Story;
