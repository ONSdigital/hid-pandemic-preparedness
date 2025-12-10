import type { Meta, StoryObj } from "@storybook/react";

import { Code } from "./Code";
import type { CodeProps } from "./Code.interface";
import codeData from "./code.json?raw";

const meta = {
  component: Code,
  title: "Molecules/Core/Code",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
    component: {
      table: {
        disable: true,
      },
    },
    languages: {
      table: {
        disable: true,
      },
    },
    _editable: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CodeStory = {
  args: JSON.parse(codeData) as CodeProps,
  name: "Code",
} satisfies Story;
