import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";

import markdownContent from "../../content/learning-module-content.md?raw";
import { parseMarkdown } from "../../helpers/parseMarkdown";
import { LearningModuleCard } from "./LearningModuleCard";
import type { LearningModuleCardProps } from "./LearningModuleCard.interface";

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

const learningModuleCardData: LearningModuleCardProps = {
  githubLinkHref: "https://github.com/",
  // Sanitizing using dompurify here as this is running client side
  htmlContent: DOMPurify.sanitize(htmlContent),
  readingTime: "Set aside 5-10 minutes",
  startLinkHref: "/",
  tags: [
    {
      id: "1",
      title: "Reports",
      type: "secondary",
    },
    {
      id: "2",
      title: "Begginner",
      type: "gray",
    },
  ],
  title: "Overview",
};

export const LearningModuleCardStory = {
  args: learningModuleCardData,
  name: "LearningModuleCard",
} satisfies Story;
