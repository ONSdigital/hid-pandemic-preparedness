import type { Meta, StoryObj } from "@storybook/react";

import menuItems from "../../content/menuItems.json";
import { ListGroupChecks } from "./ListGroup";
import type { ListGroupChecksProps } from "./ListGroup.interface";

const meta = {
  argTypes: {
    checkItems: {
      table: {
        disable: true,
      },
    },
    inverse: {
      table: {
        disable: true,
      },
    },
  },
  component: ListGroupChecks,
  title: "Components/List group",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ListGroupChecks>;

export default meta;
type Story = StoryObj<typeof meta>;

const listGroupChecksProps: ListGroupChecksProps = {
  title: "Theme",
  checkItems: [
    { label: "Demographic Information", id: "demographic-information" },
    { label: "Carer Specific", id: "carer-specific" },
    { label: "General Health", id: "general-health" },
    { label: "COVID-19 Symptoms", id: "covid-19-symptoms" },
    { label: "Mental Health and Wellbeing", id: "mental-health-and-wellbeing" },
    {
      label: "Economic and Employment Impact",
      id: "economic-and-employment-impact",
    },
    {
      label: "Social and Lifestyle Impacts",
      id: "social-and-lifestyle-impacts",
    },
    { label: "Travel", id: "travel" },
    { label: "Policy and Compliance", id: "policy-and-compliance" },
    { label: "Students", id: "students" },
  ],
  inverse: false,
};

export const ListGroupChecksStory = {
  name: "Checkboxes",
  args: listGroupChecksProps,
} satisfies Story;

// export const ListGroupChecksInverseStory = {
//   name: "Checkboxes inverse",
//   args: {
//     ...listGroupChecksProps,
//     inverse: true,
//   },
//   globals: {
//     backgrounds: { value: "dark" },
//   },
// } satisfies Story;
