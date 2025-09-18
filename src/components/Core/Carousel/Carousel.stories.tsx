import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import type { CardToolProps } from "@components/CardTool/CardTool.interface";
import type { CardUnitProps } from "@components/CardUnit/CardUnit.interface";

import { Carousel } from "./Carousel";

const meta = {
  component: Carousel,
  title: "Organisms/Core/Carousel",
  parameters: {
    layout: "padded",
  },
  argTypes: {
    itemsPerView: {
      control: { type: "number", min: 1, max: 6 },
      description: "Number of items to show per view",
    },
    showNavigation: {
      control: { type: "boolean" },
      description: "Show navigation arrows and pagination dots",
    },
    callToAction: {
      control: { type: "object" },
      description: "Call to action button",
    },
    title: {
      control: { type: "text" },
      description: "Title of the carousel",
    },
    subtitle: {
      control: { type: "text" },
      description: "Subtitle of the carousel",
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTools: CardToolProps[] = [
  {
    id: uuidv4(),
    icon: "calculator",
    title: "Sample size calculator",
    subTitle: "Estimates required sample size for a study or survey.",
    link: {
      href: "/tools/sample-size-calculator",
      label: "Try now",
    },
  },
  {
    id: uuidv4(),
    icon: "questionbank",
    title: "Question bank",
    subTitle: "Curated library of ready-to-use, evidence-backed questions.",
    link: {
      href: "/tools/question-bank",
      label: "Try now",
    },
  },
  {
    id: uuidv4(),
    icon: "dashboard",
    title: "Modelling dashboard",
    subTitle: "An infectious disease modelling dashboard.",
    link: {
      href: "/tools/modelling-dashboard",
      label: "Try now",
    },
  },
  {
    id: uuidv4(),
    icon: "report",
    title: "Survey analysis tool",
    subTitle: "Analyze survey data with automated insights and visualizations.",
    link: {
      href: "/tools/survey-analysis",
      label: "Try now",
    },
  },
  {
    id: uuidv4(),
    icon: "calculator",
    title: "Risk assessment calculator",
    subTitle: "Calculate risk scores for various health scenarios.",
    link: {
      href: "/tools/risk-calculator",
      label: "Try now",
    },
  },
  {
    id: uuidv4(),
    icon: "dashboard",
    title: "Data visualization tool",
    subTitle: "Create interactive charts and graphs from your data.",
    link: {
      href: "/tools/data-visualization",
      label: "Try now",
    },
  },
];

// Sample CardUnit data
const sampleUnits: CardUnitProps[] = [
  {
    id: uuidv4(),
    link: {
      href: "/unit/data-analysis",
      label: "Data Analysis Guide",
    },
    subTitle:
      "Learn essential data analysis techniques for pandemic preparedness.",
    tags: [
      { id: uuidv4(), title: "Analysis", type: "primary" },
      { id: uuidv4(), title: "Statistics", type: "primary" },
    ],
    readingTime: "5 min read",
  },
  {
    id: uuidv4(),
    link: {
      href: "/unit/data-collection",
      label: "Data Collection Methods",
    },
    subTitle:
      "Best practices for collecting reliable health data during emergencies.",
    tags: [
      { id: uuidv4(), title: "Collection", type: "primary" },
      { id: uuidv4(), title: "Methods", type: "primary" },
    ],
    readingTime: "8 min read",
  },
  {
    id: uuidv4(),
    link: {
      href: "/unit/visualization",
      label: "Data Visualization",
    },
    subTitle:
      "Create compelling visualizations to communicate health insights.",
    tags: [
      { id: uuidv4(), title: "Visualization", type: "primary" },
      { id: uuidv4(), title: "Communication", type: "primary" },
    ],
    readingTime: "6 min read",
  },
];

// Sample React nodes
const sampleNodes = [
  <div
    key="node1"
    style={{
      padding: "20px",
      background: "#f0f0f0",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <h3>Custom Content 1</h3>
    <p>This is a custom React node</p>
  </div>,
  <div
    key="node2"
    style={{
      padding: "20px",
      background: "#e0f0ff",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <h3>Custom Content 2</h3>
    <p>Another custom React node</p>
  </div>,
  <div
    key="node3"
    style={{
      padding: "20px",
      background: "#f0ffe0",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <h3>Custom Content 3</h3>
    <p>Yet another custom React node</p>
  </div>,
];

export const CardToolCarousel: Story = {
  args: {
    type: "CardTool",
    items: sampleTools,
    itemsPerView: 3,
    showNavigation: true,
  },
  name: "CardTool Carousel",
};

export const CardUnitCarousel: Story = {
  args: {
    type: "CardUnit",
    items: sampleUnits,
    itemsPerView: 3,
    showNavigation: true,
  },
  name: "CardUnit Carousel",
};

export const ReactNodeCarousel: Story = {
  args: {
    type: "ReactNode",
    items: sampleNodes,
    itemsPerView: 2,
    showNavigation: true,
  },
  name: "React Node Carousel",
};

export const Default: Story = {
  args: {
    type: "CardTool",
    items: sampleTools,
    itemsPerView: 3,
    showNavigation: true,
    title: "Tools to guide planning and response efforts",
    subtitle: "Recommended under the theme “Mortality Analysis”",
    callToAction: {
      label: "View all",
      href: "/tools",
    },
  },
  name: "Default (CardTool)",
};

export const TwoItemsPerView: Story = {
  args: {
    type: "CardTool",
    items: sampleTools,
    itemsPerView: 2,
    showNavigation: true,
  },
  name: "Two items per view",
};

export const FourItemsPerView: Story = {
  args: {
    type: "CardTool",
    items: sampleTools,
    itemsPerView: 4,
    showNavigation: true,
  },
  name: "Four items per view",
};

export const WithoutNavigation: Story = {
  args: {
    type: "CardTool",
    items: sampleTools,
    itemsPerView: 3,
    showNavigation: false,
  },
  name: "Without navigation",
};

export const FewItems: Story = {
  args: {
    type: "CardTool",
    items: sampleTools.slice(0, 2),
    itemsPerView: 3,
    showNavigation: true,
  },
  name: "Few items (no pagination needed)",
};

export const ManyItems: Story = {
  args: {
    type: "CardTool",
    items: [
      ...sampleTools,
      ...sampleTools.map((tool) => ({
        ...tool,
        id: uuidv4(),
        title: `${tool.title} (Extended)`,
      })),
    ],
    itemsPerView: 3,
    showNavigation: true,
  },
  name: "Many items (multiple pages)",
};
