# Contributing

In order to comply with ONS Digital Services guidance and standards, and to follow general best practice, please follow the principles below when interacting with this project.

## Follow the feature branch workflow and name branches appropriately

This project uses the [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). When naming branches, please use the default naming a Jira ticket provides e.g.`ONSPPT-110-create-button-component`.

## Use semantic versioning

This project uses [semantic versioning](https://semver.org/).

## Use gpg to sign all commits

All commits should be [signed using a gpg key linked to your github account](https://docs.github.com/en/authentication/managing-commit-signature-verification) to align with wider ONS standards.

## Use proportionate human-led review

This repository uses proportionate human-led review based on change impact.

### Category 1: Non-material changes

Definition: changes with no impact on functional, non-functional, security, or architectural requirements.

Examples:

- Documentation, content, and text updates
- Formatting and styling changes
- Image, metadata, and link updates
- Refactoring with no functional change

Required:

- Pull request
- GitHub Copilot review
- Author self-review
- Validation evidence where appropriate

### Category 2: Material changes

Definition: changes that affect or may affect functional, non-functional, security, or architectural requirements.

Examples:

- New features
- Changes to application behaviour or business logic
- Dependency upgrades
- Infrastructure, CI/CD, or security changes
- Architectural changes or significant refactoring
- Changes affecting performance, reliability, maintainability, availability, or usability

Required:

- Pull request
- GitHub Copilot review
- At least 1 independent human reviewer (not the author)
- Validation evidence (tests/checks/manual)
- Clear pull request description and risk/impact note

Reviewer focus:

- Intended outcome is achieved
- Evidence is sufficient
- No obvious unintended risks
- Pull request description matches delivered change
