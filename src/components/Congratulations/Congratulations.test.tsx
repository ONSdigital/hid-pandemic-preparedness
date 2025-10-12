import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { Congratulations } from "./Congratulations";

describe("Congratulations component", () => {
  const title = "Well Done!";
  const htmlContent = "<p>This is a congratulatory message.</p>";
  const textContent = "This is a congratulatory message.";

   beforeEach(() => {
    render(<Congratulations title={title} htmlContent={htmlContent} />);
  });

  test("renders the title inside an h5 heading", () => {
    const heading = screen.getByRole("heading", { level: 5 });
    expect(heading).toHaveTextContent(title);
  });

  test("renders the HTML content correctly", () => {
    const text = screen.getByText(textContent)
    expect(text.tagName).toBe("P")
  });
});

