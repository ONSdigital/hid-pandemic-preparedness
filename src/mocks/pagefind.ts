// mock required to prevent vitest compilation error as test suite runs before pagefind.js exists
export const init = async () => {};
export const debouncedSearch = async () => ({ results: [] });
