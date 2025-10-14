import type { Meta, StoryObj } from "@storybook/react";

import caseStudiesData from "./case-studies.json";
import { CaseStudies } from "./CaseStudies";
import type { CaseStudiesProps } from "./CaseStudies.interface";

const meta = {
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
    mainCard: {
      table: {
        disable: true,
      },
    },
    smallCards: {
      table: {
        disable: true,
      },
    },
  },
  component: CaseStudies,
  title: "Organisms/Home/CaseStudies",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

// Setting some values here to satisfy typescript
const caseStudiesProps: CaseStudiesProps = {
  ...caseStudiesData,
  mainCard: [
    {
      ...caseStudiesData.mainCard[0],
      size: "large",
      image: {
        ...caseStudiesData.mainCard[0].image,
        fieldtype: "asset",
      },
    },
  ],
  smallCards: caseStudiesData.smallCards.map((card) => ({
    ...card,
    size: "small",
    image: {
      ...card.image,
      fieldtype: "asset",
    },
  })),
};

export const CaseStudiesStory = {
  name: "CaseStudies",
  args: caseStudiesProps,
} satisfies Story;
