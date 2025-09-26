# ADR-9: Use node.js version v22.x

## Related NFRs

[security-2][1], [security-6][2], [security-9][3]

## Rationale

Node.js is required for the Astro.js framework. At the time of project initiation, [node.js v22.17.0](https://nodejs.org/download/release/v22.17.0/) is the latest LTS version available. Using this version ensures the applications maintainability and sustainability.

The minor version of this node version will be incremented during development as and when new versions are available. See the [.nvmrc](../../.nvmrc) file for the current version used.

[1]: ../non-functional-requirements/security.md#security-2
[2]: ../non-functional-requirements/security.md#security-6
[3]: ../non-functional-requirements/security.md#security-9
