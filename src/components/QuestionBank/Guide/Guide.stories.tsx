import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";

import markdownContent from "../../../content/QuestionBank/explainer.md?raw";
import { parseMarkdown } from "../../../helpers/parseMarkdown";
import { Guide } from "./Guide";
import type { GuideProps } from "./Guide.interface";

const meta = {
  component: Guide,
  title: "Organisms/QuestionBank/Guide",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    topContent: {
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
} satisfies Meta<typeof Guide>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse markdown to html
const htmlContent = await parseMarkdown(markdownContent);

// Sanitizing using dompurify here as this is running client side
const guideProps: GuideProps = {
  topTitle: "Getting started",
  topContent: { htmlContent: DOMPurify.sanitize(htmlContent) },
  bottomTitle: "About the question bank",
  bottomContent: { htmlContent: DOMPurify.sanitize(htmlContent) },
  bottomLink: {
    href: "/",
    label: "Back to question bank",
  },
};

export const GuideStory = {
  name: "Guide",
  args: guideProps,
} satisfies Story;
