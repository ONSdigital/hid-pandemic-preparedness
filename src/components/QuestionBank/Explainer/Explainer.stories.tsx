import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";

import markdownContent from "../../../content/QuestionBank/explainer.md?raw";
import { parseMarkdown } from "../../../helpers/parseMarkdown";
import { Explainer } from "./Explainer";
import type { ExplainerProps } from "./Explainer.interface";

const meta = {
  component: Explainer,
  title: "Organisms/QuestionBank/Explainer",
  parameters: {
    layout: "fullscreen",
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
} satisfies Meta<typeof Explainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse and sanitize markdown to html
const htmlContent = await parseMarkdown(markdownContent);

const explainerProps: ExplainerProps = {
  // Sanitizing using dompurify here as this is running client side
  htmlContent: DOMPurify.sanitize(htmlContent),
};

export const ExplainerStory = {
  name: "Explainer",
  args: explainerProps,
} satisfies Story;
