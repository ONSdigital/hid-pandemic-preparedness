import { v4 as uuidv4 } from "uuid";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import type { StrategicPartnersProps } from "./StrategicPartners.interface";
import { StrategicPartners } from "./StrategicPartners";

describe("StrategicPartners component", () => {
  const baseProps: StrategicPartnersProps = {
    title: "strategic partners",
    partners: [
      {
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
      },
    ],
  };

  test("renders `strategic-partners-title` as sentence case", () => {
    render(<StrategicPartners {...baseProps} />);
    const title = screen.getByRole("strategic-partners-title");
    expect(title.textContent).toBe("Strategic partners");
  });
});
