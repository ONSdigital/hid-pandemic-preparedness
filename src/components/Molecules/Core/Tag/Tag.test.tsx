import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import strings from "@src/content/strings.json";

import { Tag } from "./Tag";

describe("Tag component", () => {
  test("renders as `location` tag if valid location supplied as `title` prop", () => {
    const title: string = "United Kingdom";
    // Confirm `title` is in location strings
    expect(Object.values(strings.locations).includes(title)).toBeTruthy;

    render(<Tag title={title} />);
    // Tag should be rendered with the `tag-location` role
    const tag = screen.getByRole("tag-location");
    expect(tag.textContent).toBe(title);
  });
  test("renders as `theme` tag if valid theme supplied as `title` prop", () => {
    const title: string = "Reports";
    // Confirm `title` is in theme strings
    expect(Object.values(strings.themes).includes(title)).toBeTruthy;

    render(<Tag title={title} />);
    // Tag should be rendered with the `tag-theme` role
    const tag = screen.getByRole("tag-theme");
    expect(tag.textContent).toBe(title);
  });
  test("renders as `level` tag if valid level supplied as `title` prop", () => {
    const title: string = "Beginner";
    // Confirm `title` is in level strings
    expect(Object.values(strings.levels).includes(title)).toBeTruthy;

    render(<Tag title={title} />);
    // Tag should be rendered with the `tag-level` role
    const tag = screen.getByRole("tag-level");
    expect(tag.textContent).toBe(title);
  });
  test("renders as `default` tag if `title` prop doesn't match", () => {
    const title: string = "Dinnertime";
    // Confirm `title` is not a valid string
    expect(Object.values(strings.locations).includes(title)).toBeFalsy;
    expect(Object.values(strings.themes).includes(title)).toBeFalsy;
    expect(Object.values(strings.levels).includes(title)).toBeFalsy;

    render(<Tag title={title} />);
    // Tag should be rendered with the `tag-level` role
    const tag = screen.getByRole("tag-level");
    expect(tag.textContent).toBe(title);
  });
});
