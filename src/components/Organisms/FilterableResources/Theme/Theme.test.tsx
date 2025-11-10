import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { SubTheme } from "@/src/components/Organisms/FilterableResources/SubTheme/SubTheme";
import { FilterableResourcesItem } from "@src/components/Molecules/FilterableResources/FilterableResourcesItem/FilterableResourcesItem";

import { Theme } from "./Theme";
import type { ThemeProps } from "./Theme.interface";
import themeJson from "./theme.json?raw";

// Mock the child components
vi.mock(
  "@/src/components/Organisms/FilterableResources/SubTheme/SubTheme",
  () => ({
    SubTheme: vi.fn(() => <div data-testid="sub-theme">Mock Sub Theme</div>),
  }),
);

describe("Theme", () => {
  const mockProps: ThemeProps = {
    ...JSON.parse(themeJson),
  };

  test("it renders SubTheme correctly", () => {
    // Reset mock so we can count for just this render
    SubTheme.mockClear();
    render(<Theme {...mockProps} />);

    // Should be called 3 times as there are 3 subThemes in props
    expect(SubTheme).toHaveBeenCalledTimes(3);
  });
});
