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

import { FilterMenu } from "@components/QuestionBank/FilterMenu/FilterMenu";
import type { FilterMenuProps } from "@components/QuestionBank/FilterMenu/FilterMenu.interface";
import type { QuestionBlockProps } from "@components/QuestionBank/QuestionBlock/QuestionBlock.interface";
import { parseMarkdown } from "@helpers/parseMarkdown";
import type { TagData } from "@localTypes/TagData";

const meta = {
  component: FilterMenu,
  title: "Organisms/QuestionBank/FilterMenu",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    filterMenu: { table: { disable: true } },
    questionBlocks: { table: { disable: true } },
  },
} satisfies Meta<typeof FilterMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function createQuestionBlock(
  id: string,
  title: string,
  tags: TagData[],
  htmlContents: string[],
) {
  return {
    id,
    title,
    tags: tags.map((tag) => ({
      id: tag.id,
      title: tag.title,
      type: tag.type,
    })),
    questions: htmlContents.map((htmlContent) => ({
      id: uuidv4(),
      htmlContent: DOMPurify.sanitize(htmlContent),
    })),
  };
}

const ageQ1HtmlContent = await parseMarkdown(ageQ1MdContent);
const ageQ2HtmlContent = await parseMarkdown(ageQ2MdContent);
const ageQ3HtmlContent = await parseMarkdown(ageQ3MdContent);
const ageQ4HtmlContent = await parseMarkdown(ageQ4MdContent);
const ageQ5HtmlContent = await parseMarkdown(ageQ5MdContent);

const ethnicityQ1HtmlContent = await parseMarkdown(ethnicityQ1MdContent);
const ethnicityQ2HtmlContent = await parseMarkdown(ethnicityQ2MdContent);

const travelQ1HtmlContent = await parseMarkdown(travelQ1MdContent);
const travelQ2HtmlContent = await parseMarkdown(travelQ2MdContent);

// Checkbox and QuestionBlock must have common ID and label
const themeLabel1 = "Demographic Information";
const themeId1 = uuidv4();
const themeLabel2 = "Travel";
const themeId2 = uuidv4();

// Construct props for ListGroupCheck component
const filterMenuData = {
  title: "Theme",
  checkItems: [
    { label: themeLabel1, id: themeId1 },
    { label: themeLabel2, id: themeId2 },
  ],
  inverse: false,
};

// Construct props for QuestionBlock component
const ageQuestionBlock = createQuestionBlock(
  uuidv4(),
  "Age",
  [{ id: themeId1, title: themeLabel1, type: "secondary" }],
  [
    ageQ1HtmlContent,
    ageQ2HtmlContent,
    ageQ3HtmlContent,
    ageQ4HtmlContent,
    ageQ5HtmlContent,
  ],
);

const ethnicityQuestionBlock = createQuestionBlock(
  uuidv4(),
  "Ethnicity",
  [{ id: themeId1, title: themeLabel1, type: "secondary" }],
  [ethnicityQ1HtmlContent, ethnicityQ2HtmlContent],
);

const travelQuestionBlock = createQuestionBlock(
  uuidv4(),
  "Frequency and purpose of travel (business, leisure, family)",
  [
    {
      id: themeId2,
      title: themeLabel2,
      type: "secondary",
    },
  ],
  [travelQ1HtmlContent, travelQ2HtmlContent],
);

const questionBlocksData: QuestionBlockProps[] = [
  ageQuestionBlock,
  ethnicityQuestionBlock,
  travelQuestionBlock,
];

// Bring all the props together for FilterMenu component
const filterMenuProps: FilterMenuProps = {
  filterMenu: filterMenuData,
  questionBlocks: questionBlocksData,
};

export const FilterMenuStory = {
  name: "FilterMenu",
  args: filterMenuProps,
} satisfies Story;
