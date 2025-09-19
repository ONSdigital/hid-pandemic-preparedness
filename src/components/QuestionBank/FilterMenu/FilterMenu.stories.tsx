import type { Meta, StoryObj } from "@storybook/react";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

import ageQ1MdContent from "@content/QuestionBank/questions/age/1.md?raw";
import ageQ2MdContent from "@content/QuestionBank/questions/age/2.md?raw";
import ageQ3MdContent from "@content/QuestionBank/questions/age/3.md?raw";
import ageQ4MdContent from "@content/QuestionBank/questions/age/4.md?raw";
import ageQ5MdContent from "@content/QuestionBank/questions/age/5.md?raw";
import ethnicityQ1MdContent from "@content/QuestionBank/questions/ethnicity/1.md?raw";
import ethnicityQ2MdContent from "@content/QuestionBank/questions/ethnicity/2.md?raw";
import travelQ1MdContent from "@content/QuestionBank/questions/travel/1.md?raw";
import travelQ2MdContent from "@content/QuestionBank/questions/travel/2.md?raw";

import { parseMarkdown } from "@src/helpers/parseMarkdown";
import { FilterMenu } from "@components/QuestionBank/FilterMenu/FilterMenu";
import type { FilterMenuProps } from "@components/QuestionBank/FilterMenu/FilterMenu.interface";
import listGroupCheckData from "@content/listGroupCheckData.json";
import type { QuestionBlockProps } from "@components/QuestionBank/QuestionBlock/QuestionBlock.interface";
import type { TagData } from "@src/types/TagData";

const meta = {
  component: FilterMenu,
  title: "Organisms/QuestionBank/FilterMenu",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof FilterMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

async function createQuestionBlock(
  title: string,
  tags: Omit<TagData, "id">[],
  markdownContents: string[],
): Promise<QuestionBlockProps> {
  const htmlContents = await Promise.all(markdownContents.map(parseMarkdown));

  return {
    id: uuidv4(),
    title,
    tags: tags.map((tag) => ({
      id: uuidv4(),
      title: tag.title,
      type: tag.type,
    })),
    questions: htmlContents.map((htmlContent) => ({
      id: uuidv4(),
      htmlContent: DOMPurify.sanitize(htmlContent),
    })),
  };
}
const ageQuestionBlock = await createQuestionBlock(
  "Demographic information",
  [{ title: "Age", type: "secondary" }],
  [
    ageQ1MdContent,
    ageQ2MdContent,
    ageQ3MdContent,
    ageQ4MdContent,
    ageQ5MdContent,
  ],
);

const ethnicityQuestionBlock = await createQuestionBlock(
  "Demographic information",
  [{ title: "Ethnicity", type: "secondary" }],
  [ethnicityQ1MdContent, ethnicityQ2MdContent],
);

const travelQuestionBlock = await createQuestionBlock(
  "Travel",
  [
    {
      title: "Frequency and purpose of travel (business, leisure, family)",
      type: "secondary",
    },
  ],
  [travelQ1MdContent, travelQ2MdContent],
);

const questionBlockList: QuestionBlockProps[] = [
  ageQuestionBlock,
  ethnicityQuestionBlock,
  travelQuestionBlock,
];

const filterMenuProps: FilterMenuProps = {
  listGroupChecksProps: listGroupCheckData,
  questionBlockListProps: questionBlockList,
};

export const FilterMenuStory = {
  name: "FilterMenu",
  args: filterMenuProps,
} satisfies Story;
