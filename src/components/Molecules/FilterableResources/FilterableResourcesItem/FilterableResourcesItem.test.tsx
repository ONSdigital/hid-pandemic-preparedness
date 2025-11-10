import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { TextModule } from "@components/Molecules/Core/TextModule/TextModule";
import { CopyButton } from "@components/Molecules/Core/CopyButton/CopyButton";

import { FilterableResourcesItem } from "./FilterableResourcesItem";
import type { FilterableResourcesItemProps } from "./FilterableResourcesItem.interface";
import filterableResourcesJson from "./filterableResourcesItem.json?raw";

// Mock the child components
vi.mock("@components/Molecules/Core/TextModule/TextModule", () => ({
  TextModule: vi.fn(() => <div data-testid="text-module">Mock TextModule</div>),
}));

vi.mock("@components/Molecules/Core/CopyButton/CopyButton", () => ({
  CopyButton: vi.fn(() => <button data-testid="copy-button">Mock Copy</button>),
}));

describe("FilterableResourcesItem", () => {
  const mockProps: FilterableResourcesItemProps = {
    ...JSON.parse(filterableResourcesJson),
  };

  test("it renders TextModule and CopyButton", () => {
    render(<FilterableResourcesItem {...mockProps} />);

    expect(screen.getByTestId("text-module")).toBeInTheDocument();
    expect(screen.getByTestId("copy-button")).toBeInTheDocument();
  });

  test("it passes props to TextModule correctly", () => {
    render(<FilterableResourcesItem {...mockProps} />);

    expect(TextModule).toHaveBeenCalledWith(
      expect.objectContaining({ richText: mockProps.content }),
      undefined,
    );
  });

  test("it passes a ref to CopyButton", () => {
    render(<FilterableResourcesItem {...mockProps} />);

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
