import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { v4 as uuidv4 } from "uuid";
import "@testing-library/jest-dom";

import type { StoryblokAsset, StoryblokMultilink } from "@src/types/storyblok";

import type { IconAndTextLinkProps } from "./IconAndTextLink.interface";
import { IconAndTextLink } from "./IconAndTextLink";

describe("IconAndTextLink component", () => {
  const label: string = "My test label";
  const baseProps: IconAndTextLinkProps = {
    icon: "download",
    label: label,
  };

  test("renders successfully with minimum props", () => {
    render(<IconAndTextLink {...baseProps} />);
    const link = screen.getByRole("link");
    // Should set href to a default value if not provided by a link or asset
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveTextContent(label);
  });

  test("renders successfully if provided with asset", () => {
    const asset: StoryblokAsset = {
      id: 106764824362307,
      alt: "",
      name: "",
      focus: "",
      title: "",
      source: "",
      filename:
        "https://a.storyblok.com/f/287525897740819/1058x628/0eeee8df30/workflows.jpg",
      copyright: "",
      fieldtype: "asset",
      meta_data: {},
      is_external_url: false,
      is_private: false,
      src: "",
      updated_at: "",
      width: 0,
      height: 0,
      aspect_ratio: 0,
      public_id: "",
      content_type: "",
    };

    render(<IconAndTextLink {...baseProps} asset={asset} />);
    const link = screen.getByRole("link");
    // Should set href to asset filename
    expect(link).toHaveAttribute("href", asset.filename);
  });

  test("renders successfully if provided with link", () => {
    const linkProp: StoryblokMultilink = {
      id: "843daaab-ad93-455c-a8b9-97fe96bcb309",
      rel: "",
      url: "",
      title: "About the platform",
      linktype: "story",
      fieldtype: "multilink",
      cached_url: "about",
    };
    render(<IconAndTextLink {...baseProps} link={linkProp} />);
    const link = screen.getByRole("link");
    // Should set href to santized url
    expect(link).toHaveAttribute("href", `/${linkProp.cached_url}/`);
  });
});
