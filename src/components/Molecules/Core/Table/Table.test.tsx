import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Table } from "./Table";
import type { TableProps } from "./Table.interface";

const defaultProps: TableProps = {
  component: "Table",
  _uid: "uniqueId",
  table: {
    type: "doc",
    content: [
      {
        type: "table",
        content: [
          {
            text: "Test content inside of table",
            type: "text",
          },
        ],
      },
    ],
  },
};

const renderTable = (props: Partial<TableProps> = {}) => {
  return render(<Table {...defaultProps} {...props} />);
};

// Mock TextModule to simplify testing
vi.mock("../TextModule/TextModule", () => ({
  TextModule: ({ richText }: { richText: any }) => (
    <div data-testid="text-module">{JSON.stringify(richText)}</div>
  ),
}));

// Mock styles
vi.mock("./Table.module.scss", () => {
  return {
    default: {
      "scrollable-table": "scrollable-table",
      "table-wrapper": "table-wrapper",
      "table-container": "table-container",
      "can-scroll-left": "can-scroll-left:",
      "can-scroll-right": "can-scroll-right:",
    },
  };
});

describe("Table component", () => {
  it("renders without crashing and displays content", () => {
    renderTable();
    expect(screen.getByTestId("text-module")).toHaveTextContent(
      JSON.stringify(defaultProps.table.content),
    );
  });

  it("does not render if table content is empty", () => {
    const props = {
      table: {
        type: "doc",
        content: undefined,
      },
    };
    const { container } = renderTable(props);
    expect(container.firstChild).toBeNull();
  });

  it("sets minWidth from prop when provided", () => {
    renderTable({ minWidth: "800" });
    const container = screen.getByTestId("text-module").parentElement;
    expect(container).toHaveStyle("min-width: 800px");
  });

  it("shows shadows correctly", () => {
    renderTable();

    const scrollableTable = document.querySelector(
      ".scrollable-table",
    ) as HTMLElement;

    const tableWrapper = document.querySelector(
      ".table-wrapper",
    ) as HTMLElement;

    expect(scrollableTable).toHaveClass("scrollable-table");

    // Mock scroll positions
    Object.defineProperties(tableWrapper, {
      scrollLeft: { writable: true, configurable: true, value: 0 },
      scrollWidth: { writable: true, configurable: true, value: 1000 },
      clientWidth: { writable: true, configurable: true, value: 500 },
    });

    // only shows right shadow when you can scroll to right
    fireEvent.scroll(tableWrapper);
    expect(scrollableTable.className).not.toContain("can-scroll-left");
    expect(scrollableTable.className).toContain("can-scroll-right");

    // shows both shadows when you can scroll in both directions
    tableWrapper.scrollLeft = 10;
    fireEvent.scroll(tableWrapper);
    expect(scrollableTable.className).toContain("can-scroll-left");
    expect(scrollableTable.className).toContain("can-scroll-right");

    // only shows right shadow when you can scroll to left
    tableWrapper.scrollLeft = 500;
    fireEvent.scroll(tableWrapper);
    expect(scrollableTable.className).toContain("can-scroll-left");
    expect(scrollableTable.className).not.toContain("can-scroll-right");
  });

  it("adds and removes event listeners on mount and unmount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderTable();

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });
});
