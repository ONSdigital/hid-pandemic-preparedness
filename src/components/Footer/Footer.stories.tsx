import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./Footer";
import type { FooterProps } from "./Footer.interface";

const meta = {
  component: Footer,
  title: "Components/Footer",
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const footerData: FooterProps = {
  columnLeft: {
    title: "What We Do",
    links: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Contact Us" },
      { href: "#", label: "Get Involved" },
      { href: "#", label: "Privacy Policy" },
    ],
  },
  columnMid: {
    title: "Resources",
    links: [
      { href: "#", label: "Outputs and Reporting" },
      { href: "#", label: "Data Collection" },
      { href: "#", label: "Data Analysis" },
      { href: "#", label: "Stakeholder Engagement" },
      { href: "#", label: "Data Governance" },
    ],
  },
  columnRight: {
    title: "Tools",
    links: [
      { href: "#", label: "Outputs and Reporting" },
      { href: "#", label: "Data Collection" },
      { href: "#", label: "Data Analysis" },
      { href: "#", label: "Stakeholder Engagement" },
      { href: "#", label: "Data Governance" },
    ],
  },
};

export const FooterStory = {
  name: "Footer",
  args: footerData,
} satisfies Story;
