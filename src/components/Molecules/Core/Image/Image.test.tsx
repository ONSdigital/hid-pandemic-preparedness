import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import type { ImageProps } from "./Image.interface";
import { Image } from "./Image";

describe("Image component", () => {
  const baseProps: ImageProps = {
    id: 99913189991725,
    alt: null,
    name: "",
    focus: "",
    title: "",
    source: "",
    filename: null,
    copyright: "",
    fieldtype: "asset",
    meta_data: {
      alt: "CEMIC logo",
      title: "",
      source: "",
      copyright: "",
    },
    is_external_url: false,
  };

  test("renders `image` with empty alt attribute when alt is null", () => {
    render(<Image {...baseProps} />);
    const partnerImage = screen.getByRole("image");
    expect(partnerImage).toHaveAttribute("alt", "");
  });

  test("renders `image` with src attribute set to `null` when filename is null", () => {
    render(<Image {...baseProps} />);
    const partnerImage = screen.getByRole("image");
    expect(partnerImage).toHaveAttribute("src", "null");
  });

  test("renders `image` with alt attribute when alt is provided", () => {
    const altText: string = "Example Alt Text";
    const props = {
      ...baseProps,
      alt: altText,
    };
    render(<Image {...props} />);
    const partnerImage = screen.getByRole("image");
    expect(partnerImage).toHaveAttribute("alt", altText);
  });

  test("renders `image` with src attribute when alt is provided", () => {
    const filename: string =
      "https://a.storyblok.com/f/287525897740819/134x41/4c1231f443/cemic-logo.svg";
    const props = {
      ...baseProps,
      filename: filename,
    };
    render(<Image {...props} />);
    const partnerImage = screen.getByRole("image");
    expect(partnerImage).toHaveAttribute("src", filename);
  });
});
