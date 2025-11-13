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
      "table-shadow": "table-shadow",
      left: "left",
      right: "right",
      "table-wrapper": "table-wrapper",
      "table-container": "table-container",
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

    const tableWrapper = document.querySelector(
      ".table-wrapper",
    ) as HTMLElement;

    const leftShadow = document.querySelector(
      ".table-shadow.left",
    ) as HTMLElement;

    const rightShadow = document.querySelector(
      ".table-shadow.right",
    ) as HTMLElement;

    // Mock scroll positions
    Object.defineProperties(tableWrapper, {
      scrollLeft: { writable: true, value: 0 },
      scrollWidth: { writable: true, value: 1000 },
      clientWidth: { writable: true, value: 500 },
    });

    // only shows right shadow when you can scroll to right
    fireEvent.scroll(tableWrapper);
    expect(leftShadow).toHaveStyle("opacity: 0");
    expect(rightShadow).toHaveStyle("opacity: 1");

    // shows both shadows when you can scroll in both directions
    tableWrapper.scrollLeft = 10;
    fireEvent.scroll(tableWrapper);
    expect(leftShadow).toHaveStyle("opacity: 1");
    expect(rightShadow).toHaveStyle("opacity: 1");

    // only shows left shadow when you can scroll to right
    tableWrapper.scrollLeft = 500;
    fireEvent.scroll(tableWrapper);
    expect(leftShadow).toHaveStyle("opacity: 1");
    expect(rightShadow).toHaveStyle("opacity: 0");
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
