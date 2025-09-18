import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";

import learningModuleCardData from "../../content/learningModuleCard.json";
import { LearningModuleCard } from "./LearningModuleCard";
import type { LearningModuleCardProps } from "./LearningModuleCard.interface";
import markdownContent from "../../content/learning-module-content.md?raw";
import { parseMarkdown } from "../../helpers/parseMarkdown";
import type { TagData } from "../../types/TagData";

const meta = {
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
    tags: {
      table: {
        disable: true,
      },
    },
  },
  component: LearningModuleCard,
  parameters: {
    layout: "centered",
  },
  title: "Components/LearningModuleCard",
} satisfies Meta<typeof LearningModuleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse markdown to html
const htmlContent = await parseMarkdown(markdownContent);

const learningModuleCardProps: LearningModuleCardProps = {
  // Sanitizing using dompurify here as this is running client side
  htmlContent: DOMPurify.sanitize(htmlContent),
  ...learningModuleCardData,
  tags: learningModuleCardData.tags as TagData[],
};

export const LearningModuleCardStory = {
  args: learningModuleCardProps,
  name: "LearningModuleCard",
} satisfies Story;
