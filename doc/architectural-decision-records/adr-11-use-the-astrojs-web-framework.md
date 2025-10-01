# ADR-11: Use the Astro.js web framework v5.11.1

## Related NFRs

[performance-1][1], [performance-2][2]

## Rationale

[ADR-7](./adr-7-deploy-as-a-static-site.md) requires that the application is deployed as a static site. Many web frameworks can be used to develop static sites, with [Astro](https://astro.build/), [Gatsby](https://www.gatsbyjs.com/), [Hugo](https://gohugo.io/) and [Next.js](https://nextjs.org/) being evaluated. Astro was chosen for the following reasons:

- It is optimised for Static Site Generation (SSG), which prioritises Server-Side Rendering (SSR)
- It is well suited for a content-heavy application that has minimal dynamic content
- It sends zero JavaScript on render unless specified, which means it has improved load times and reduced band-width \[[1]\] \[[2]\]
- It is framework agnostic, which means that components can be built using React and integrated within Storybook

At the time of project initiation, [Astro.js v5.11.1](https://github.com/withastro/astro/releases/tag/astro%405.11.1) is the latest stable version available.

The minor version of this Astro.js version will be incremented during development as and when new versions are available. See the [package.json](../../package.json) file for the current version used.

[1]: ../non-functional-requirements/performance.md#performance-1
[2]: ../non-functional-requirements/performance.md#performance-2
