import { describe, expect, expectTypeOf, test, vi } from "vitest";
import "@testing-library/jest-dom";

import { DynamicComponent } from "./DynamicComponent";

describe("DynamicComponent", () => {
  test("returns a known component without error", () => {
    const blok = {
      component: "Carousel",
      _uid: "123",
    };
    const component = DynamicComponent({ blok });
    expectTypeOf(component).toBeAny;
  });

  test("returns null when component is not found in the map", () => {
    const blok = {
      component: "UnknownComponent",
      _uid: "123",
    };
    const component = DynamicComponent({ blok });
    // Should return null
    expect(component).toBeNull;
  });

  test("logs warning when component is not found in the map", () => {
    // Mock `console.warn`
    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});
    const blok = {
      component: "UnknownComponent",
      _uid: "123",
    };
    DynamicComponent({ blok });
    // Mocked console.warn should include warning string
    expect(consoleWarnMock).toHaveBeenCalledWith(
      expect.stringContaining(
        'Component "UnknownComponent" not found in COMPONENT_MAP',
      ),
    );
    consoleWarnMock.mockRestore();
  });
});
