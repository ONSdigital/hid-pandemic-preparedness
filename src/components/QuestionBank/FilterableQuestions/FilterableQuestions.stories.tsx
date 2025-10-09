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

import { FilterableQuestions } from "@components/QuestionBank/FilterableQuestions/FilterableQuestions";
import type { FilterableQuestionsProps } from "@components/QuestionBank/FilterableQuestions/FilterableQuestions.interface";
import type { QuestionBlockProps } from "@components/QuestionBank/QuestionBlock/QuestionBlock.interface";
import { parseMarkdown } from "@helpers/parseMarkdown";
import type { TagData } from "@localTypes/TagData";
import { getCheckboxListItems } from "@helpers/QuestionBank/getCheckboxListItems";

const meta = {
  component: FilterableQuestions,
  title: "Organisms/QuestionBank/FilterableQuestions",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    filterCheckboxList: { table: { disable: true } },
    questionBlocks: { table: { disable: true } },
  },
} satisfies Meta<typeof FilterableQuestions>;

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

const filterTitleData = "Theme";

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

// Construct props for ListGroupCheck component
const filterCheckboxList = {
  listItems: getCheckboxListItems(questionBlocksData),
  inverse: false,
};

// Bring all the props together for FilterableQuestions component
const filterMenuProps: FilterableQuestionsProps = {
  filterTitle: filterTitleData,
  filterCheckboxList: filterCheckboxList,
  questionBlocks: questionBlocksData,
};

export const FilterableQuestionsStory = {
  name: "FilterableQuestions",
  args: filterMenuProps,
} satisfies Story;
