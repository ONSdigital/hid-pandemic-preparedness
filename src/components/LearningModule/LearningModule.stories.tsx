import type { Meta, StoryObj } from "@storybook/react";
import { LearningModule } from "./LearningModule";
import type { LearningModuleProps } from "./LearningModule.interface";

const meta = {
  argTypes: {
    learningOutcomesList: {
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
  component: LearningModule,
  parameters: {
    layout: "centered",
  },
  title: "Components/LearningModule",
} satisfies Meta<typeof LearningModule>;

export default meta;
type Story = StoryObj<typeof meta>;

const learningModuleData: LearningModuleProps = {
  learningOutcomesList: [
    "Understand",
    "Identify",
    "Understand",
    "Apply",
    "Analyse",
    "Present",
  ],
  learningOutcomesTitle: "Learning outcomes:",
  readingTime: "Set aside 5-10 minutes",
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
  textBold:
    "The guidance introduces key concepts, methods, and tools used globally, with examples drawn from the UK’s Office for National Statistics (ONS).",
  textRegular:
    "This guidance introduces the principles and practices of mortality analysis. It is designed for professionals working in public health, statistics, policy, or research who need to interpret mortality trends and use them to inform decisions. ",
  title: "Overview",
};

export const LearningModuleStory = {
  args: learningModuleData,
  name: "LearningModule",
} satisfies Story;
