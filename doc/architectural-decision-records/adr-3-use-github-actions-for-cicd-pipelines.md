# ADR-3: Use github actions for CI/CD pipelines

## Related NFRs

[development-5][1], [security-5][2]

## Rationale

Project source code must be secure \[[1]\] and developers should be able to deploy iteratively to aid development \[[2]\]. Therefore this project is set up to use Continuous Integration/Continuous Development (CI/CD) pipelines to ensure code security and quality and manage deployments. [Github actions](https://github.com/features/actions) were chosen to manage these pipelines as they are available as part of the ONSdigital github organisation and require no further tooling.

See [README.md](../../README.md) for more details on how the project pipelines are set up.

[1]: ../non-functional-requirements/development.md#development-5
[2]: ../non-functional-requirements/security.md#security-5
