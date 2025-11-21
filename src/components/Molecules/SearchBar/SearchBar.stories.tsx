import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta = {
  component: SearchBar,
  title: "Molecules/SearchBar",
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div>
        <div style={{ marginBottom: "2rem" }}>
          <Story />
        </div>

        <div
          id="search-results-portal"
          style={{
            border: "1px dashed #ccc",
            minHeight: "100px",
            padding: "1rem",
          }}
        >
          <small style={{ color: "#999" }}>
            Portal Target (Results render here)
          </small>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownMode: Story = {
  name: "Dropdown Mode",
  args: {
    placeholder: "Search...",
    isResultsPage: false,
    initialQuery: "",
  },
};

export const ResultsPageMode: Story = {
  name: "Results Page Mode",
  args: {
    placeholder: "Search...",
    isResultsPage: true,
    initialQuery: "Storybook Test",
  },
};
