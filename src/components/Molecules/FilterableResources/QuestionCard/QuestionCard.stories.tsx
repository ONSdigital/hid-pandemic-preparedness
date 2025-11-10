import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

import q1MdContent from "@content/QuestionBank/questions/age/1.md?raw";
import { parseMarkdown } from "@helpers/parseMarkdown";
import { QuestionCard } from "./QuestionCard";
import type { QuestionData } from "@localTypes/QuestionData";

const meta = {
  component: QuestionCard,
  title: "Molecules/QuestionBank/QuestionCard",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof QuestionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse markdown to html
const q1HtmlContent = await parseMarkdown(q1MdContent);

const questionCardProps: QuestionData = {
  id: uuidv4(),
  htmlContent: DOMPurify.sanitize(q1HtmlContent),
};

export const QuestionCardStory = {
  name: "QuestionCard",
  args: questionCardProps,
} satisfies Story;
