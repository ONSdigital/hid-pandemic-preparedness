import { v4 as uuidv4 } from "uuid";

import type { QuestionBlock } from "@src/types/QuestionBlock";
import type { QuestionData } from "@src/types/QuestionData";

import { parseMarkdown } from "./parseMarkdown";

// Takes input markdown filepath
export async function createQuestionBlock(
  markdownContent: string,
): Promise<QuestionBlock> {
  // Extract the title from the first H1 heading (# ...)
  const titleMatch = markdownContent.match(/^#\s+(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled";

  // Split the markdown into lines for processing
  const lines = markdownContent.split("\n");

  // This regex matches lines starting with **N. ...**
  const questionHeaderRegex = /^\*\*(\d+)\.\s*(.+?)\*\*$/;

  const questionData: QuestionData[] = [];

  interface Question {
    questionStartIndex: number;
    questionEndIndex: number;
  }

  let questions: Array<Question> = [];
  let questionCount: number = 0;

  // Find where each question starts and ends
  lines.forEach((line, index) => {
    const headerMatch = line.match(questionHeaderRegex);
    if (headerMatch) {
      questionCount += 1;
      questions.push({
        questionStartIndex: index,
        questionEndIndex: index,
      });
    }

    if (questionCount > 0) {
      questions[questionCount - 1].questionEndIndex = index;
    }
  });

  // Now convert to html for each and create questionData
  for (let i = 0; i < questions.length; i++) {
    const questionMarkdown = lines
      .slice(questions[i].questionStartIndex, questions[i].questionEndIndex)
      .join("\n");
    const htmlContent = await parseMarkdown(questionMarkdown);

    questionData.push({
      id: uuidv4(),
      htmlContent: htmlContent,
    });
  }

  return {
    id: uuidv4(),
    title,
    tags: [],
    questions: questionData,
  };
}
