import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Footer } from "./Footer";
import type { FooterProps } from "./Footer.interface";

const meta = {
  component: Footer,
  title: "Components/Footer",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    columns: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const footerData: FooterProps = {
  columns: [
    {
      id: uuidv4(),
      title: "What We Do",
      links: [
        { id: uuidv4(), href: "#", label: "About Us" },
        { id: uuidv4(), href: "#", label: "Contact Us" },
        { id: uuidv4(), href: "#", label: "Get Involved" },
        { id: uuidv4(), href: "#", label: "Privacy Policy" },
      ],
    },
    {
      id: uuidv4(),
      title: "Resources",
      links: [
        { id: uuidv4(), href: "#", label: "Outputs and Reporting" },
        { id: uuidv4(), href: "#", label: "Data Collection" },
        { id: uuidv4(), href: "#", label: "Data Analysis" },
        { id: uuidv4(), href: "#", label: "Stakeholder Engagement" },
        { id: uuidv4(), href: "#", label: "Data Governance" },
      ],
    },
    {
      id: uuidv4(),
      title: "Tools",
      links: [
        { id: uuidv4(), href: "#", label: "Outputs and Reporting" },
        { id: uuidv4(), href: "#", label: "Data Collection" },
        { id: uuidv4(), href: "#", label: "Data Analysis" },
        { id: uuidv4(), href: "#", label: "Stakeholder Engagement" },
        { id: uuidv4(), href: "#", label: "Data Governance" },
      ],
    },
    {
      id: uuidv4(),
      links: [
        { id: uuidv4(), href: "#", label: "Contact" },
        { id: uuidv4(), href: "#", label: "Select country" },
        { id: uuidv4(), href: "#", label: "Github" },
        { id: uuidv4(), href: "#", label: "Privacy policy" },
      ],
    },
  ],
};

export const FooterStory = {
  name: "Footer",
  args: footerData,
} satisfies Story;
