import type { Tokens } from "marked";

// Define some match strings we can use to target content to format differently
const matchStrings = {
  function: "!FUNCTION",
  tip: "!TIP",
};

export const tipTokenizer = {
  name: "tip",
  level: "block",
  start(src: string) {
    return src.indexOf(matchStrings.tip);
  },
  tokenizer(src: string) {
    const rule = new RegExp(`^${matchStrings.tip}\\s+(.*)(\\n|$)`);
    const match = rule.exec(src);
    if (match) {
      return {
        type: "tip",
        raw: match[0],
        text: match[1].trim(),
      };
    }
  },
  renderer(token: Tokens.Paragraph) {
    return `<span class="tip-ppt">${token.text}</span>`;
  },
};
