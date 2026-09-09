---
agent: "agent"
description: "Create a new component using existing project patterns"
---

Create a new component in this repository.

Constraints:
- Reuse and extend existing components before creating new primitives.
- Check `src/components/molecules` and `src/components/organisms` first.
- Do not invent Storyblok fields; use existing schema and generated types.
- Preserve existing public APIs unless explicitly asked to change them.
- Ask for approval before adding dependencies.

Process:
1. Inspect existing components, stories, and tests to match conventions.
2. Define where the new code belongs:
	- shared UI component
	- Storyblok blok wrapper
	- Storyblok mapping layer
3. Implement the component with semantic HTML and keyboard-accessible interactions where applicable.
4. Add or update Storybook stories for realistic states, including loading/empty states if relevant.
5. Add or update tests for user-visible behavior.
6. Run relevant checks (`npm run lint`, `npm run test`, and `npm run build` when app-impacting).

Return:
1. Files changed and why
2. Existing components/utilities reused
3. Expected Storyblok data shape
4. Validation commands run and outcomes
5. Follow-up items (if any)

Task:
${input:task:Describe the component and where it will be used}
