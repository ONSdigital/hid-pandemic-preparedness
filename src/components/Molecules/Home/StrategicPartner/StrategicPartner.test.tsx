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
});
