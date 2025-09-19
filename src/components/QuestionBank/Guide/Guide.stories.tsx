import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";

import topMarkdownContent from "@content/tools/question-bank/guide/top-content.md?raw";
import bottomMarkdownContent from "@content/tools/question-bank/guide/bottom-content.md?raw";
import { parseMarkdown } from "@helpers/parseMarkdown";

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
} satisfies Meta<typeof Guide>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse markdown to html
const topHtmlContent = await parseMarkdown(topMarkdownContent);
const bottomHtmlContent = await parseMarkdown(bottomMarkdownContent);

// Sanitizing using dompurify here as this is running client side
const guideProps: GuideProps = {
  topTitle: "Getting started",
  topContent: { htmlContent: DOMPurify.sanitize(topHtmlContent) },
  topLink: {
    href: "/",
    label: "Back to question bank",
  },
  bottomTitle: "About the question bank",
  bottomContent: { htmlContent: DOMPurify.sanitize(bottomHtmlContent) },
  bottomLink: {
    href: "/",
    label: "Back to question bank",
  },
};

export const GuideStory = {
  name: "Guide",
  args: guideProps,
} satisfies Story;
