import { clsx } from "clsx";
import { marked } from "marked";
import type { Tokens } from "marked";

export const renderer = new marked.Renderer();

// Copied from https://github.com/markedjs/marked/blob/master/src/Renderer.ts and modified to set
// custom classes to `table` html tags
renderer.table = function (token: Tokens.Table) {
  const cssClasses: string = clsx("table", "table-borderless", "table-ppt");

  let header = "";

  // header
  let cell = "";
  for (let j = 0; j < token.header.length; j++) {
    cell += this.tablecell(token.header[j]);
  }
  header += this.tablerow({ text: cell });

  let body = "";
  for (let j = 0; j < token.rows.length; j++) {
    const row = token.rows[j];

    cell = "";
    for (let k = 0; k < row.length; k++) {
      cell += this.tablecell(row[k]);
    }

    body += this.tablerow({ text: cell });
  }
  if (body) body = `<tbody>${body}</tbody>`;

  return (
    `<table class="${cssClasses}">\n` +
    "<thead>\n" +
    header +
    "</thead>\n" +
    body +
    "</table>\n"
  );
};
