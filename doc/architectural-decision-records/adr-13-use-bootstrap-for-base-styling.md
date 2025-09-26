# ADR-13: Use Bootstrap 5.3.8 for base styling

## Related NFRs

[accessibility-1][1], [accessibility-2][2], [compatibility-1][3], [compatibility-2][4], [usability-4][5]

## Rationale

The application frontend needs to meet accessibility requirements \[[1]\] \[[2]\], it must be compatible with different devices \[[3]\] and browsers \[[4]\] and it must be usable \[[5]\]. Meeting these requirements can of course be acheived by writing custom CSS styling classes to suit the project, but this could increase development time. The decison was taken to use a CSS framwork to provide a comprehensive set of base styles, components, and utilities to build upon. [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) was chosen as the base CSS framework for the application for the following reasons:

- It is comprehensive and mature with a large ecosystem and,extensive documentation
- It provides a responsive grid system that simplifies building responsive layouts across devices
- Components are built with accessibility in mind, helping us to meet our accessibility requirements
- It provides cross-browser compatibility
- It provides styles as compilable SCSS, allowing the tailoring of styles to suit the project brand and specific application requirements

At the time of project initiation, [Bootstrap 5.3.8](https://github.com/twbs/bootstrap/releases/tag/v5.3.8) is the latest stable version available.

The minor version of this Bootstrap version will be incremented during development as and when new versions are available. See the [styles folder](../../src/styles/) for the current version used.

[1]: ../non-functional-requirements/accessibility.md#accessibility-1
[2]: ../non-functional-requirements/accessibility.md#accessibility-2
[3]: ../non-functional-requirements/compatibility.md#compatibility-1
[4]: ../non-functional-requirements/compatibility.md#compatibility-2
[5]: ../non-functional-requirements/usability.md#usability-4
