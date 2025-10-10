import { v4 as uuidv4 } from "uuid";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import type { ReferenceProps } from "./Reference.interface";
import { Reference } from "./Reference";

describe("Reference component", () => {
  const baseProps: ReferenceProps = {
    _uid: uuidv4(),
    accessedDate: "19th August 2025",
    yearPublished: "2021",
    websiteAuthor: "The Independent Panel for Pandemic Preparedness & Response",
    websiteTitle: "COVID-19: Make it the Last Pandemic",
    websiteUrl:
      "https://theindependentpanel.org/wp-content/uploads/2021/05/COVID-19-Make-it-the-Last-Pandemic_final.pdf",
  };

  test("renders `reference-link` with url constructed of `_uid`", () => {
    const expectedHref: string = `#${baseProps._uid}`;
    render(<Reference {...baseProps} />);
    const referenceLink = screen.getByRole("reference-link");
    expect(referenceLink).toHaveAttribute("href", expectedHref);
  });

  test("renders `REF!` as label if `label` not provided as prop", () => {
    // There is no `label` as part of baseProps
    render(<Reference {...baseProps} />);
    const referenceLink = screen.getByRole("reference-link");
    expect(referenceLink.textContent).toBe("(REF!)");
  });

  test("renders `label` if label if is provided as prop", () => {
    // There is no `label` as part of baseProps
    const labelStr: string = "My label";
    render(<Reference {...baseProps} label={labelStr} />);
    const referenceLink = screen.getByRole("reference-link");
    expect(referenceLink.textContent).toBe(`(${labelStr})`);
  });
});
