import { describe, expect, expectTypeOf, test } from "vitest";
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

  test("throws an error when component is not found in the map", () => {
    const blok = {
      component: "UnknownComponent",
      _uid: "123",
    };
    // Wrap in a function to test throwing
    expect(() => DynamicComponent({ blok })).toThrowError(
      /Component "UnknownComponent" not found in COMPONENT_MAP/,
    );
  });
});
