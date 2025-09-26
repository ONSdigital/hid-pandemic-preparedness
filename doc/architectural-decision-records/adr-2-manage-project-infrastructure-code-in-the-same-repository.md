# ADR-2: Manage project infrastructure code in the same repository

## Related NFRs

[development-2][1], [security-6][2]

## Rationale

The GOV.UK Service Manual recommends that configuration code should be made open<sup>[1]</sup>. The project source code should also be easy to maintain<sup>[2]</sup>. Project Infrastructure as Code (IaC) is therefore stored in a dedicated folder in the project repository.

[1]: ../non-functional-requirements/development.md#development-2
[2]: ../non-functional-requirements/security.md#development-6
