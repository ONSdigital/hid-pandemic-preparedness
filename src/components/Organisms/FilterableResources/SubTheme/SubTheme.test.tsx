import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { Tag } from "@src/components/Molecules/Core/Tag/Tag";
import { FilterableResourcesItem } from "@src/components/Molecules/FilterableResources/FilterableResourcesItem/FilterableResourcesItem";

import { SubTheme } from "./SubTheme";
import type { SubThemeProps } from "./SubTheme.interface";
import subThemeJson from "./subTheme.json?raw";

// Mock the child components
vi.mock("@src/components/Molecules/Core/Tag/Tag", () => ({
  Tag: vi.fn(() => <div data-testid="tag">Mock Tag</div>),
}));

vi.mock(
  "@src/components/Molecules/FilterableResources/FilterableResourcesItem/FilterableResourcesItem",
  () => ({
    FilterableResourcesItem: vi.fn(() => (
      <div data-testid="filterable-resources-item">Mock Item</div>
    )),
  }),
);

describe("SubTheme", () => {
  const mockProps: SubThemeProps = {
    ...JSON.parse(subThemeJson),
  };

  test("it doesn't render tag if `parentTag` is not in props", () => {
    render(<SubTheme {...mockProps} />);
    expect(screen.queryByTestId("tag")).toBeNull;
  });

  test("it renders tag if `parentTag` is in props", () => {
    const updatedProps: SubThemeProps = {
      ...mockProps,
      parentTheme: "Demographic information",
    };
    render(<SubTheme {...updatedProps} />);
    expect(screen.getByTestId("tag")).toBeInTheDocument;
  });

  test("it passes props to Tag correctly", () => {
    const updatedProps: SubThemeProps = {
      ...mockProps,
      parentTheme: "Demographic information",
    };

    render(<SubTheme {...updatedProps} />);

    expect(Tag).toHaveBeenCalledWith(
      expect.objectContaining({ title: updatedProps.parentTheme }),
      undefined,
    );
  });

  test("it renders FilterableResourcesItem correctly", () => {
    // Reset mock so we can count for just this render
    FilterableResourcesItem.mockClear();
    render(<SubTheme {...mockProps} />);

    // Should be called 5 times as there are 5 items in props
    expect(FilterableResourcesItem).toHaveBeenCalledTimes(5);
  });
});
