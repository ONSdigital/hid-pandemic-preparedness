import type { Meta, StoryObj } from "@storybook/react";

import impactAndPartnersData from "../../../content/Home/impactAndPartners.json";
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
    partnerItems: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ImpactAndPartners>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImpactAndPartnersStory = {
  name: "ImpactAndPartners",
  args: { ...impactAndPartnersData } as ImpactAndPartnersProps,
} satisfies Story;
