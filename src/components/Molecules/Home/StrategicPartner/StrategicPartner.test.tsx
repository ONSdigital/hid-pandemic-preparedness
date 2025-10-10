import { v4 as uuidv4 } from "uuid";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import type { StrategicPartnerProps } from "./StrategicPartner.interface";
import { StrategicPartner } from "./StrategicPartner";

describe("StrategicPartner component", () => {
  const baseProps: StrategicPartnerProps = {
    _uid: uuidv4(),
    link: {
      id: uuidv4(),
      cached_url: "https://example.com",
      fieldtype: "multilink",
      linktype: "url",
      url: "https://example.com",
    },
    logo: {
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
    },
  };

  test("renders `partner-link` with url", () => {
    render(<StrategicPartner {...baseProps} />);
    const partnerLink = screen.getByRole("partner-link");
    expect(partnerLink).toHaveAttribute("href", baseProps.link.url);
  });

  test("renders `partner-image` with empty alt attribute when alt is null", () => {
    render(<StrategicPartner {...baseProps} />);
    const partnerImage = screen.getByRole("partner-image");
    expect(partnerImage).toHaveAttribute("alt", "");
  });

  test("renders `partner-image` with src attribute set to `null` when filename is null", () => {
    render(<StrategicPartner {...baseProps} />);
    const partnerImage = screen.getByRole("partner-image");
    expect(partnerImage).toHaveAttribute("src", "null");
  });

  test("renders `partner-image` with alt attribute when alt is provided", () => {
    const altText: string = "Example Alt Text";
    const props = {
      ...baseProps,
      logo: { ...baseProps.logo, alt: altText },
    };
    render(<StrategicPartner {...props} />);
    const partnerImage = screen.getByRole("partner-image");
    expect(partnerImage).toHaveAttribute("alt", altText);
  });

  test("renders `partner-image` with src attribute when alt is provided", () => {
    const filename: string =
      "https://a.storyblok.com/f/287525897740819/134x41/4c1231f443/cemic-logo.svg";
    const props = {
      ...baseProps,
      logo: { ...baseProps.logo, filename: filename },
    };
    render(<StrategicPartner {...props} />);
    const partnerImage = screen.getByRole("partner-image");
    expect(partnerImage).toHaveAttribute("src", filename);
  });
});
