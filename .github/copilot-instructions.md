# .github/copilot-instructions.md

This repository is an Astro + React + TypeScript platform with content driven by Storyblok.

## Rule Priority

If rules conflict, follow this order:

1. Security and correctness
2. Existing behavior and public APIs
3. Storyblok schema and generated types
4. Accessibility and performance
5. Team workflow preferences

## Implementation Rules (Must)

1. Reuse and extend existing components before creating new ones.
2. Check `src/components/molecules` and `src/components/organisms` first.
3. Preserve existing component APIs unless the task explicitly requires a change.
4. Keep shared UI components presentation-focused; avoid Storyblok mapping or data-fetching logic in shared UI.
5. Treat Storyblok schema and generated types as source of truth.
6. Do not invent Storyblok fields or route shapes, and do not assume optional fields are present.
7. Prefer explicit mapping functions from Storyblok bloks to component props.
8. Keep relation resolution and slug logic centralized.
9. Reuse existing styles, layout primitives, and utilities where possible.
10. Ask permission before adding any new dependency.

## Front-End Quality (Must)

1. Use semantic HTML.
2. Ensure keyboard navigation and visible focus states for interactive components.
3. Ensure interactive elements have accessible labels/names.
4. Include loading and empty states where relevant.
5. Consider rendering and bundle performance; avoid unnecessary complexity.

## Storybook and Testing (Must)

1. If a component changes, update or add Storybook stories for realistic states.
2. Include at least one keyboard-interaction story for interactive components.
3. Test user-visible behavior and states, not implementation details.
4. Run the smallest relevant validation set before finishing:
   - `npm run lint`
   - `npm run test`
   - `npm run build` (for app-impacting changes)
   - `npm run build-storybook` (for shared component changes)

## Storyblok Change Handling

When Storyblok schema changes are involved:

1. Regenerate types using `npm run generate-storyblok-types`.
2. Verify renderers and mapping code are still aligned with updated types.
3. Explain expected content shape and any editor-facing implications.

## Response Expectations

When proposing or making changes, explain:

1. Which files changed and why
2. What existing code was reused
3. What Storyblok data shape is expected
4. Which checks were run and their outcome

## Scope Note

Detailed branch and PR governance belongs in `CONTRIBUTING.md`. Keep this file focused on coding behavior and quality gates.
