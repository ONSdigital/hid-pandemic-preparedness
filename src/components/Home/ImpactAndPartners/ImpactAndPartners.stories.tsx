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
    partnerItems: {
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
  partnerItems: [
    {
      id: uuidv4(),
      img: {
        id: uuidv4(),
        altText: "Office for National Statistics logo",
        srcPath: "./partners/ONS_Logo_Digital_Colour_English_RGB.svg",
      },
      link: {
        href: "https://www.ons.gov.uk/",
        label: "Office for National Statistics",
      },
    },
    {
      id: uuidv4(),
      img: {
        id: uuidv4(),
        altText: "Emblem of Nepal",
        srcPath: "./partners/Emblem_of_Nepal.svg",
      },
      link: {
        href: "#",
        label: "Emblem of Nepal",
      },
    },
    {
      id: uuidv4(),
      img: {
        id: uuidv4(),
        altText: "National Statistical Office of Malawi logo",
        srcPath: "./partners/malawi-national-statistical-office.svg",
      },
      link: {
        href: "https://www.nsomalawi.mw/",
        label: "National Statistical Office of Malawi",
      },
    },
    {
      id: uuidv4(),
      img: {
        id: uuidv4(),
        altText: "INDEC logo",
        srcPath: "./partners/Logo_Indec.svg",
      },
      link: {
        href: "https://www.indec.gob.ar/",
        label: "The National Institute of Statistics and Censuses (INDEC)",
      },
    },
    {
      id: uuidv4(),
      img: {
        id: uuidv4(),
        altText: "Wellcome logo",
        srcPath: "./partners/wellcome.svg",
      },
      link: {
        href: "https://wellcome.org/",
        label: "Wellcome",
      },
    },
    {
      id: uuidv4(),
      img: {
        id: uuidv4(),
        altText: "HERD International logo",
        srcPath: "./partners/herdi_nepal.svg",
      },
      link: {
        href: "https://herdint.com/",
        label: "HERD International",
      },
    },
    {
      id: uuidv4(),
      img: {
        id: uuidv4(),
        altText: "LUKE International logo",
        srcPath: "./partners/LIN-Luke-logo.svg",
      },
      link: {
        href: "https://lukeinternational.no/",
        label: "LUKE International",
      },
    },
    {
      id: uuidv4(),
      img: {
        id: uuidv4(),
        altText: "CEMIC logo",
        srcPath: "./partners/cemic-logo.svg",
      },
      link: {
        href: "https://www.cemic.edu.ar/",
        label: "CEMIC",
      },
    },
  ],
};

// id: string;
// altText: string;
// srcPath: string;
// caption?: string;
// title?: string;
// width?: string;
// height?: string;

export const ImpactAndPartnersStory = {
  name: "ImpactAndPartners",
  args: impactAndPartnersProps,
} satisfies Story;
