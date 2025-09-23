import { clsx } from "clsx";
import { marked } from "marked";
import type { Tokens } from "marked";

export const markedRenderer = new marked.Renderer();

markedRenderer.table = function (token: Tokens.Table) {
  const tableClasses: string = clsx("table", "table-striped");

  const headerHtml = `<tr>\n${token.header.map((cell) => this.tablecell(cell)).join("")}</tr>\n`;
  const bodyHtml = token.rows
    .map(
      (row) =>
        `<tr>\n${row.map((cell) => this.tablecell(cell)).join("")}</tr>\n`,
    )
    .join("");

  return `<table class="${tableClasses}">
<thead>
${headerHtml}</thead>
<tbody>${bodyHtml}</tbody></table>
`;
};
