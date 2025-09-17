import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";

import markdownContent from "../../content/learning-module-content.md?raw";
import { parseMarkdown } from "../../helpers/parseMarkdown";
import { LearningModule } from "./LearningModule";
import type { LearningModuleProps } from "./LearningModule.interface";

const meta = {
  argTypes: {
    tags: {
      table: {
        disable: true,
      },
    },
  },
  component: LearningModule,
  parameters: {
    layout: "centered",
  },
  title: "Components/LearningModule",
} satisfies Meta<typeof LearningModule>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse markdown to html
const htmlContent = await parseMarkdown(markdownContent);

const learningModuleData: LearningModuleProps = {
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

export const LearningModuleStory = {
  args: learningModuleData,
  name: "LearningModule",
} satisfies Story;
