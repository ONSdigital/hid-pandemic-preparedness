---
agent: "agent"
description: "Extend an existing component safely"
---

Update an existing component in this repository.

Process:
1. Inspect the current component API, usage sites, story files, and tests.
2. Preserve existing behavior unless the task explicitly requests a breaking change.
3. If the component is too specific, consider extracting a generic base component and composing it for old/new use cases.
4. Reuse existing utilities and patterns.
5. Explain whether the new feature belongs in:
   - shared UI
   - Storyblok blok wrapper
   - Storyblok mapping layer
6. Update stories and tests for changed behavior.
7. Call out accessibility or Storyblok schema implications.
8. Run relevant checks (`npm run lint`, `npm run test`, and `npm run build` when app-impacting).

Constraints:
- Do not invent Storyblok field names or route shapes.
- Preserve existing component APIs unless explicitly required to change them.
- Ask for approval before adding dependencies.

Return:
1. Files changed and why
2. Any API or behavior changes and migration notes (if needed)
3. Reused components/utilities
4. Storyblok data shape impact
5. Validation commands run and outcomes

Task:
${input:task:Describe the change}
