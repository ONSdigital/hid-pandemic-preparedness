import type { Meta, StoryObj } from "@storybook/react";

import markdownContent from "@content/learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/congratulationsContent.md?raw";
import congratulationsData from "@content/learning-resources/data-analysis/epidemiological-analysis/mortality-analysis/congratulationsTitle.json";
import { parseMarkdown } from "@src/helpers/parseMarkdown";
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

const htmlContent = await parseMarkdown(markdownContent);

const congratulationsProps: CongratulationsProps = {
  title: congratulationsData.title,
  htmlContent: htmlContent,
};

export const CongratulationsStory = {
  name: "Congratulations",
  args: congratulationsProps,
} satisfies Story;
