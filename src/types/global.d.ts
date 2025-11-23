// Declare the bootstrap property on the Window interface so TypeScript recognizes it.
// eslint-disable-next-line no-unused-vars
interface Window {
  bootstrap: {
    Popover: typeof import("bootstrap/js/dist/popover").default;
    Tooltip: typeof import("bootstrap/js/dist/tooltip").default;
  };
}
