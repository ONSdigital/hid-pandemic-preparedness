import type { Meta, StoryObj } from "@storybook/react";

import markdownContent from "../../content/learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/congratulations.md?raw";
import { parseMarkdown } from "../../helpers/parseMarkdown";
import { Congratulations } from "./Congratulations";
import type { CongratulationsProps } from "./Congratulations.interface";

const meta = {
  component: Congratulations,
  title: "Components/Congratulations",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    
  },
} satisfies Meta<typeof Congratulations>;

export default meta;
type Story = StoryObj<typeof meta>;

const htmlContent = await parseMarkdown(markdownContent)

const congratulationsProps: CongratulationsProps = {
  text: "Congratulations!",
  htmlContent: htmlContent
};

export const CongratulationsStory = {
  name: "Congratulations",
  args: congratulationsProps,
} satisfies Story;
