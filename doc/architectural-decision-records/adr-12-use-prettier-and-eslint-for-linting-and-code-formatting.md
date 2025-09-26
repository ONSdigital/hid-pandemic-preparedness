# ADR-12: Use Prettier and ESLint for linting and code-formatting

## Related NFRs

## Rationale

[Prettier](https://prettier.io) and [ESLint](https://eslint.org/) were adopted as tools within our project for linting and code-formatting respectively. Maintaining a clean and consistent codebase aids in future-proofing the project, which these tools will ensure. Prettier is an opinionated linter that focuses on enforcing consistent style. ESLint is a configurable code-formatter, which enforces best-practices and catches potential errors early. These tools were chosen since they are widely adopted, well-supported and together will cover all bases. See the [eslint.config.js](../../eslint.config.js) file for the configuration and rules in use.

In order to make sure these two tools work harmoniously together, without styling rules from ESLint interferring with those applied through Prettier, the [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) plugin is used.

To ensure that both Prettier and ESLint recognise and handle Astro-specific files, the [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro) and community maintained [eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro) plugins were used (the latter of which also outlines the recommended `eslint.config.js` as part of its documentation).
