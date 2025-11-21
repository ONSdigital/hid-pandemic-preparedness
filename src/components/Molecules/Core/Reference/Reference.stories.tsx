import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import type { ReferenceProps } from "./Reference.interface";
import { Reference } from "./Reference";

// Added here to avoid typescript errors in decorator below
declare global {
  interface Window {
    bootstrap: {
      Popover: any;
      Tooltip: any;
    };
  }
}

const meta = {
  component: Reference,
  title: "Molecules/Core/Reference",
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
  decorators: [
    (Story) => {
      // Run initialization immediately (no DOMContentLoaded)
      // Use a small timeout to ensure story DOM is updated
      setTimeout(() => {
        const popoverTriggerList = Array.from(
          document.querySelectorAll('[data-bs-toggle="popover"]'),
        );
        popoverTriggerList.forEach((popoverTriggerEl) => {
          new window.bootstrap.Popover(popoverTriggerEl, {
            trigger: "focus",
          });
        });
      }, 0);

      return Story();
    },
  ],
} satisfies Meta<typeof Reference>;

export default meta;
type Story = StoryObj<typeof meta>;

const referenceProps: ReferenceProps = {
  _uid: uuidv4(),
  component: "Reference",
  accessedDate: "19th August 2025",
  yearPublished: "2021",
  websiteAuthor: "The Independent Panel for Pandemic Preparedness & Response",
  websiteTitle: "COVID-19: Make it the Last Pandemic",
  websiteUrl:
    "https://theindependentpanel.org/wp-content/uploads/2021/05/COVID-19-Make-it-the-Last-Pandemic_final.pdf",
  label: "1",
};

export const ReferenceStory = {
  name: "Reference",
  args: referenceProps,
} satisfies Story;
