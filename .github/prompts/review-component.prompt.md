---
agent: "agent"
description: "Review component quality, accessibility, reuse, and alignment with project patterns"
---

Review the selected component or files in this repository.

Process:

1. Inspect the selected files and related usages.
2. Compare against existing component and Storyblok patterns.
3. Check accessibility, API design, reusability, and behavior regressions.
4. Check whether stories and tests cover real, user-visible states.
5. Identify whether code belongs in shared UI, Storyblok wrapper, or mapping layer.

Review focus:

- Findings first, ordered by severity.
- Emphasize bugs, regressions, and schema/type mismatches.
- Include evidence with exact file paths and line numbers.

Return:

1. Overall rating (1-10) for accessibility, reusability, and pattern adherence, with brief rationale
2. Critical issues
3. High issues
4. Medium issues
5. Quick wins
6. Missing tests or story coverage
7. Exact files to change
