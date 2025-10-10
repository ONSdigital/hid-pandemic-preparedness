import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { StrategicPartner } from "./StrategicPartner";
import type { StrategicPartnerProps } from "./StrategicPartner.interface";

const meta = {
  component: StrategicPartner,
  title: "Molecules/Home/StrategicPartner",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    link: { table: { disable: true } },
    logo: { table: { disable: true } },
  },
} satisfies Meta<typeof StrategicPartner>;

export default meta;
type Story = StoryObj<typeof meta>;

const strategicPartnerProps: StrategicPartnerProps = {
  link: {
    id: uuidv4(),
    cached_url: "https://www.cemic.edu.ar/",
    fieldtype: "multilink",
    linktype: "url",
    url: "https://www.cemic.edu.ar/",
  },
  logo: {
    id: 99913189991725,
    alt: null,
    name: "",
    focus: "",
    title: "",
    source: "",
    filename: "./images/logos/cemic-logo.svg",
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

export const StrategicPartnerStory = {
  name: "StrategicPartner",
  args: strategicPartnerProps,
} satisfies Story;
