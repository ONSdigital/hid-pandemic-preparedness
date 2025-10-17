import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { QuestionCard } from "./QuestionCard";
import { TextModule } from "@components/TextModule/TextModule";
import { CopyButton } from "@components/Molecules/Core/CopyButton/CopyButton";

// Mock the child components
vi.mock("@components/TextModule/TextModule", () => ({
  TextModule: vi.fn(() => <div data-testid="text-module">Mock TextModule</div>),
}));

vi.mock("@components/Molecules/Core/CopyButton/CopyButton", () => ({
  CopyButton: vi.fn(() => <button data-testid="copy-button">Mock Copy</button>),
}));

describe("QuestionCard", () => {
  const mockProps = {
    id: "q1",
    htmlContent: "<p>Some HTML content</p>",
  };

  test("it renders TextModule and CopyButton", () => {
    render(<QuestionCard {...mockProps} />);

    expect(screen.getByTestId("text-module")).toBeInTheDocument();
    expect(screen.getByTestId("copy-button")).toBeInTheDocument();
  });

  test("it passes props to TextModule correctly", () => {
    render(<QuestionCard {...mockProps} />);

    expect(TextModule).toHaveBeenCalledWith(
      expect.objectContaining(mockProps),
      undefined,
    );
  });

  test("it passes a ref to CopyButton", () => {
    render(<QuestionCard {...mockProps} />);

    expect(CopyButton).toHaveBeenCalledWith(
      expect.objectContaining({
        contentElement: expect.objectContaining({
          current: expect.any(HTMLElement),
        }),
      }),
      undefined,
    );
  });
});
