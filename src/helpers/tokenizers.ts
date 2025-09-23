import { clsx } from "clsx";

// Finds a block starting with `!TIP` and applies specific formatting
export const tipTokenizer = {
  name: "tip",
  level: "block",
  start(src: string) {
    return src.indexOf("!TIP");
  },
  tokenizer(src: string) {
    const rule = new RegExp(`^!TIP\\s+(.*)(\\n|$)`);
    const match = rule.exec(src);
    if (match) {
      return {
        type: "tip",
        raw: match[0],
        text: match[1].trim(),
        tokens: [], // no nested tokens
      };
    }
  },
  renderer(token: any) {
    const cssClasses: string = clsx(
      "d-flex",
      "p-3",
      "fw-semibold",
      "math-block",
    );
    // Render the tip in a div with a class for styling
    return `<div class="${cssClasses}">${token.text}</div>\n`;
  },
};

// Finds a block wrapped in $ e.g. `$ qₓ = (2⋅mₓ) / (2 + mₓ) $` and applies specific formatting
export const mathBlockTokenizer = {
  name: "mathBlock",
  level: "block",
  start(src: string) {
    return src.indexOf("$");
  },
  tokenizer(src: string) {
    const rule = /^\s*\$(.+?)\$\s*(?:\n|$)/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: "mathBlock",
        raw: match[0],
        text: match[1].trim(),
        tokens: [], // no nested tokens
      };
    }
  },
  renderer(token: any) {
    const cssClasses: string = clsx(
      "d-flex",
      "p-3",
      "fw-semibold",
      "math-block",
    );
    // Render the formula in a div with a class for styling
    return `<div class="${cssClasses}">${token.text}</div>\n`;
  },
};
