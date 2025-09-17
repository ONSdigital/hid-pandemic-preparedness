import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

import q1MdContent from "../../../content/QuestionBank/questions/age/1.md?raw";
import q2MdContent from "../../../content/QuestionBank/questions/age/2.md?raw";
import q3MdContent from "../../../content/QuestionBank/questions/age/3.md?raw";
import q4MdContent from "../../../content/QuestionBank/questions/age/4.md?raw";
import q5MdContent from "../../../content/QuestionBank/questions/age/5.md?raw";
import { parseMarkdown } from "../../../helpers/parseMarkdown";
import { QuestionBlock } from "./QuestionBlock";
import type { QuestionBlockProps } from "./QuestionBlock.interface";

const meta = {
  component: QuestionBlock,
  title: "Organisms/QuestionBank/QuestionBlock",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    questions: {
      table: {
        disable: true,
      },
    },
    tags: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof QuestionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse markdown to html
const q1HtmlContent = await parseMarkdown(q1MdContent);
const q2HtmlContent = await parseMarkdown(q2MdContent);
const q3HtmlContent = await parseMarkdown(q3MdContent);
const q4HtmlContent = await parseMarkdown(q4MdContent);
const q5HtmlContent = await parseMarkdown(q5MdContent);

const questionBlockProps: QuestionBlockProps = {
  id: uuidv4(),
  title: "Age",
  tags: [
    {
      id: uuidv4(),
      title: "Demographic information",
      type: "secondary",
    },
  ],
  questions: [
    {
      id: uuidv4(),
      htmlContent: DOMPurify.sanitize(q1HtmlContent),
    },
    {
      id: uuidv4(),
      htmlContent: DOMPurify.sanitize(q2HtmlContent),
    },
    {
      id: uuidv4(),
      htmlContent: DOMPurify.sanitize(q3HtmlContent),
    },
    {
      id: uuidv4(),
      htmlContent: DOMPurify.sanitize(q4HtmlContent),
    },
    {
      id: uuidv4(),
      htmlContent: DOMPurify.sanitize(q5HtmlContent),
    },
  ],
};

export const QuestionBlockStory = {
  name: "QuestionBlock",
  args: questionBlockProps,
} satisfies Story;
