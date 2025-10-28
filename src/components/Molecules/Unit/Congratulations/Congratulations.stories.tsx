import type { Meta, StoryObj } from "@storybook/react";

import strings from "@src/content/strings.json";

import { Congratulations } from "./Congratulations";
import type { CongratulationsProps } from "./Congratulations.interface";

const meta = {
  component: Congratulations,
  title: "Components/Congratulations",
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof Congratulations>;

export default meta;
type Story = StoryObj<typeof meta>;

const congratulationsProps: CongratulationsProps = {
  title: strings.unit.congratulations.title,
  htmlContent: strings.unit.congratulations.htmlContent,
};

export const CongratulationsStory = {
  name: "Congratulations",
  args: congratulationsProps,
} satisfies Story;
