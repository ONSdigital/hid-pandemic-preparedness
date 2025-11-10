import type { Meta, StoryObj } from "@storybook/react";

import supportingInformationJson from "./supportingInformation.json?raw";
import { SupportingInformation } from "./SupportingInformation";

const meta = {
  component: SupportingInformation,
  title: "Organisms/FilterableResources/SupportingInformation",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    topContent: {
      table: {
        disable: true,
      },
    },
    topLink: {
      table: {
        disable: true,
      },
    },
    bottomContent: {
      table: {
        disable: true,
      },
    },
    bottomLink: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof SupportingInformation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SupportingInformationStory = {
  name: "SupportingInformation",
  args: JSON.parse(supportingInformationJson),
} satisfies Story;
