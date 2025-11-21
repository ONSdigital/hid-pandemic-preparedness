import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

// Fake data for storybook
const mockData = Array.from({ length: 15 }, (_, i) => ({
  link: { href: "#", label: `Result Item ${i + 1}` },
  excerpt: `This is a sample excerpt for result item ${i + 1}. It contains enough text to test truncation and layout.`,
  tag: i % 2 === 0 ? [{ id: "1", label: "Documentation", href: "#" }] : [],
}));

const meta = {
  component: SearchBar,
  title: "Molecules/SearchBar",
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div>
        <div style={{ marginBottom: "2rem", maxWidth: "800px" }}>
          <p className="text-secondary small mb-2">
            <em>
              Note for Dropdown stories: Click inside the input to reveal the
              dropdown.
            </em>
          </p>
          <Story />
        </div>

        {/* Fake Portal Target for Results Page Mode */}
        <div
          id="search-results-portal"
          style={{
            border: "1px dashed #ccc",
            minHeight: "100px",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          <small
            style={{ color: "#999", display: "block", marginBottom: "1rem" }}
          >
            Portal Target (Results Page Content Renders Here)
          </small>
        </div>
      </div>
    ),
  ],
  args: {
    placeholder: "Search resources...",
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- DROPDOWN STORIES ---

export const DropdownWithResults: Story = {
  name: "Dropdown (Results Found)",
  args: {
    isResultsPage: false,
    initialQuery: "test",
    mockResults: mockData,
  } as any,
};

export const DropdownNoResults: Story = {
  name: "Dropdown (No Results)",
  args: {
    isResultsPage: false,
    initialQuery: "gibberish",
    mockResults: [],
  } as any,
};

// --- RESULTS PAGE STORIES ---

export const ResultsPagePopulated: Story = {
  name: "Results Page (Populated)",
  args: {
    isResultsPage: true,
    initialQuery: "test",
    mockResults: mockData,
  } as any,
};

export const ResultsPageEmpty: Story = {
  name: "Results Page (No Matches)",
  args: {
    isResultsPage: true,
    initialQuery: "gibberish",
    mockResults: [],
  } as any,
};
