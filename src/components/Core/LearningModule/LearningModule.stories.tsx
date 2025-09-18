import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";

import chaptersData from "../../../content/chapters.json";
import learningModuleCardData from "../../../content/learningModuleCard.json";
import markdownContent from "../../../content/learning-module-content.md?raw";
import { LearningModule } from "./LearningModule";
import type { LearningModuleProps } from "./LearningModule.interface";
import { parseMarkdown } from "../../../helpers/parseMarkdown";
import type { TagData } from "../../../types/TagData";

const meta = {
  argTypes: {},
  component: LearningModule,
  parameters: {
    layout: "centered",
  },
  title: "Organisms/Core/LearningModule",
} satisfies Meta<typeof LearningModule>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use helper to parse markdown to html
const htmlContent = await parseMarkdown(markdownContent);

const learningModuleProps: LearningModuleProps = {
  cardProps: {
    // Sanitizing using dompurify here as this is running client side
    htmlContent: DOMPurify.sanitize(htmlContent),
    ...learningModuleCardData,
    tags: learningModuleCardData.tags as TagData[],
  },
  navProps: {
    chapters: chaptersData,
    activeId: "chapter1",
  },
};

export const LearningModuleStory = {
  args: learningModuleProps,
  name: "LearningModule",
} satisfies Story;
