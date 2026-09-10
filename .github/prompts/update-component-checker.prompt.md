---
agent: "agent"
description: "Regenerate Storyblok types and detect renderer/schema misalignment"
---

Review and amend selected files or the whole app for Storyblok schema/type alignment.

Definition:

- `npm run generate-storyblok-types` updates generated TypeScript definitions only.
- It does not update Astro/React renderer code.
- After type generation, renderer and mapping code must be reviewed manually for alignment.

Process:

1. Run `npm run generate-storyblok-types`.
2. Review generated diffs for component definitions, nested blok allowances, and field name/type changes.
3. Review renderers and mapping code for schema misalignment.
4. If needed, update renderers/mappers/stories/tests to match new schema.
5. Run relevant checks (`npm run lint`, `npm run test`, and `npm run build` when app-impacting).

Constraints:

- If Storyblok credentials/env vars are missing, report the blocker and continue with static code analysis only.
- Do not assume generated type changes imply runtime renderer support.

Return:

1. Generated types changed (or no change)
2. Renderer/mapping mismatches found
3. Exact files changed and why
4. Remaining files to update (if any)
5. Validation commands run and outcomes
