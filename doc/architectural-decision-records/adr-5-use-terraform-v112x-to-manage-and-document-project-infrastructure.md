# ADR-5: Use Terraform v1.12.x to manage and document project infrastructure

## Related NFRs

[development-6][1], [security-6][2]

## Rationale

Project infrastructure must be easy to manage and maintain \[[1]\]. Development and production environments should also be as similar as possible to ensure development and testing is as effective as possible \[[2]\]. Using Infrastructure-as-Code (IaC) allows the repeatable configuration and management of infrastructure to acheive these goals.

Terraform was chosen for project IaC as there is existing knowledge with this language in both the development team and wider ONS Digital Services. It can also be configured to be cloud service agnostic, which will be useful if project hosting requirements change in the future.

At the time of project initiation, [terraform v1.12.2](https://github.com/hashicorp/terraform/releases/tag/v1.12.2) is the latest version available. The major and/or minor version of this terraform version will be incremented during development as and when new versions are available. See the [.terraform-version](../../iac/.terraform-version) file for the current version used.

[1]: ../non-functional-requirements/development.md#development-6
[2]: ../non-functional-requirements/security.md#security-6
