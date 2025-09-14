import type { Meta, StoryObj } from "@storybook/react";

import { v4 as uuidv4 } from "uuid";

import { ImpactAndPartners } from "./ImpactAndPartners";
import type { ImpactAndPartnersProps } from "./ImpactAndPartners.interface";

const meta = {
  component: ImpactAndPartners,
  title: "Organisms/Home/ImpactAndPartners",
  argTypes: {
    impactItems: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ImpactAndPartners>;

export default meta;
type Story = StoryObj<typeof meta>;

const impactAndPartnersProps: ImpactAndPartnersProps = {
  impactTitle: "Global impact",
  impactItems: [
    {
      id: uuidv4(),
      icon: "experts",
      title: "50+ experts",
      subTitle:
        "internationally have contributed to content for Analysis for Action",
    },
    {
      id: uuidv4(),
      icon: "countries",
      title: "48 countries",
      subTitle: "have joined the Analysis for Action global network",
    },
    {
      id: uuidv4(),
      icon: "users",
      title: "100,000+ users",
      subTitle: "of Analysis for Action resources so far",
    },
  ],
  partnersTitle: "Strategic partners",
};

export const ImpactAndPartnersStory = {
  name: "ImpactAndPartners",
  args: impactAndPartnersProps,
} satisfies Story;
