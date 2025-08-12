# Architectural Decision Records

This page lists the Architectural Decision Records (ADRs) that have defined the architecture and implementation of the application. The table below provides a high-level list of the application ADRs and their related non-functional requirements (NFRs). Further discussion is given in each section, including references to related NFRs.

| Id                                                                                         | Title                                                                      | Related NFRs                                                                                                                |
| :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| [ADR-1](#adr-1-manage-project-source-code-as-public-repository-on-onsdigital-organisation) | Manage project source code as public repository on ONSdigital organisation | development-1, development-4, security-4, security-7, security-8                                                            |
| [ADR-2](#adr-2-manage-project-infrastructure-code-in-the-same-repository)                  | Manage project infrastructure code in the same repository                  | development-2, security-6                                                                                                   |
| [ADR-3](#adr-3-use-github-actions-for-cicd-pipelines)                                      | Use github actions for CI/CD pipelines                                     | development-5, security-5                                                                                                   |
| [ADR-4](#adr-4-use-aws-for-deploying-project-artifacts)                                    | Use AWS for deploying project artifacts                                    | availability-1, availability-2, development-6, performance-1, performance-3, security-9, sustainability-1, sustainability-2 |
| [ADR-5](#adr-5-use-terraform-v112x-to-manage-and-document-project-infrastructure)          | Use Terraform v1.12.x to manage and document project infrastructure        | development-6, security-6                                                                                                   |
| [ADR-6](#adr-6-use-a-headless-cms)                                                         | Use a headless CMS                                                         | content-1, users-1, users-2                                                                                                 |
| [ADR-7](#adr-7-deploy-as-a-static-site)                                                    | Deploy as a static site                                                    | availability-1, availability-2, security-4, security-6, security-9, performance-1, performance-2                            |
| [ADR-8](#adr-8-use-storybook-for-ui-development)                                           | Use Storybook for UI development                                           |                                                                                                                             |
| [ADR-9](#adr-9-use-nodejs-version-v22x)                                                    | Use node.js version v22.X                                                  | security-2, security-6, security-9                                                                                          |
| [ADR-10](#adr-10-use-typescript)                                                           | Use typescript                                                             |                                                                                                                             |
| [ADR-11](#adr-11-use-the-astrojs-web-framework-v5.11.1)                                    | Use the Astro.js web framework                                             | performance-1, performance-2                                                                                                |
| [ADR-12](#adr-12-use-prettier-and-eslint-for-linting-and-code-formatting)                  | Use Prettier and ESLint for linting and code-formatting                    |                                                                                                                             |

## ADR-1: Manage project source code as public repository on ONSdigital organisation

The GOV.UK Service Manual recommends that code should be made open from the start \[development-1\] and that any changes should be tracked \[development-4\]. Project source code is therefore stored in a public repository linked to the ONS Digital github organisation. This approach ensures ONS Digital administrators can manage access to the code going forward \[security-7\], and security best practices are followed as soon as the project has started.

## ADR-2: Manage project infrastructure code in the same repository

The GOV.UK Service Manual recommends that configuration code should be made open \[development-2\]. The project source code should also be easy to maintain \[security-6\]. Project Infrastructure as Code (IaC) is therefore stored in a dedicated folder in the project repository.

## ADR-3: Use github actions for CI/CD pipelines

Project source code must be secure \[security-5\] and developers should be able to deploy iteratively to aid development \[development-5\]. Therefore this project is set up to use Continuous Integration/Continuous Development (CI/CD) pipelines to ensure code security and quality and manage deployments. [Github actions](https://github.com/features/actions) were chosen to manage these pipelines as they are available as part of the ONSdigital github organisation and require no further tooling.

See [README.md](../README.md) for more details on how the project pipelines are set up.

## ADR-4: Use AWS for deploying project artifacts

Project artifacts must be available and discoverable across multiple regions \[availability-1, availability-2\]. Deployed artifacts must load quickly \[performance-1\] and be scalable to demand \[security-9\]. This leads to the decision to use public cloud services to host project artifacts, as they provide the necessary services to meet these requirements.

AWS was chosen as the cloud services supplier as there is existing knowledge with this supplier in both the development team and wider ONS Digital Services.

## ADR-5: Use Terraform v1.12.x to manage and document project infrastructure

Project infrastructure must be easy to manage and maintain \[security-6\]. Development and production environments should also be as similar as possible to ensure development and testing is as effective as possible \[development-6\]. Using Infrastructure-as-Code (IaC) allows the repeatable configuration and management of infrastructure to acheive these goals.

Terraform was chosen for project IaC as there is existing knowledge with this language in both the development team and wider ONS Digital Services. It can also be configured to be cloud service agnostic, which will be useful if project hosting requirements change in the future.

At the time of project initiation, [terraform v1.12.2](https://github.com/hashicorp/terraform/releases/tag/v1.12.2) is the latest version available. The major and/or minor version of this terraform version will be incremented during development as and when new versions are available. See the [.terraform-version](../iac/.terraform-version) file for the current version used.

## ADR-6: Use a headless CMS

The application needs a method for non-technical users to upload content \[content-1\], and this could include interactive content such as quizzes and code examples. This led to an initial consideration of using a Content Management System (CMS) or a Learning Management System (LMS). An LMS is basically a CMS extended for web-based learning use cases and would include user logins and tracking for course completion and tailoring content. Further investigation found that the tracking of course completion was not required \[users-1\], and additionally there should be no need for a user to log in to the application to view content \[users-2\], ensuring the content is accessible as possible. This led to the decision of including a CMS rather than an LMS.

A headless CMS was chosen in place of a traditional CMS for the following reasons:

- Decouples the frontend and backend, so we can develop both separately
- Allows us to experiment with content structure before the CMS is set up
- Can be provided as a Software-as-a-Service (SaaS) which simplifies deployment and hosting

## ADR-7: Deploy as a static site

The application needs to be available across multiple regions worldwide \[availability-1\], and also discoverable \[availability-2\]. It should provide both fast loading times \[performance-1\] and also provide a good user experience in low bandwidth environments \[performance-2\]. Downloadable content should be made available to facilitate the use of the application where an internet connection is not available \[availability-3\]. To meet these needs, the application will be provided as a [static site](https://en.wikipedia.org/wiki/Static_web_page). This technology was chosen for the following reasons:

- The use of pre-built HTML files provide fast load times and low latency
- Site files can be hosted simply using a Content Delivery Network (CDN), providing availability worldwide
- As there is no backend or database, a static site is more secure as the attack surface is smaller
- Using a CDN to host the site ensures effective scalability depending on site traffic
- Site files are pre-rendered. This ensures content is Search Engine Optimised (SEO)
- The site is easier to maintain as there is reduced complexity and no server-side processing required

## ADR-8: Use Storybook for UI development

The choice of Storybook for the project's design system was made to ensure that components can be built and tested in isolation; this ensures UI modularity (which promotes a clean, maintainable code-base) and Quality Assurance. Developing our component library using Storybook allows us to make use of its accessibility tools \[accessibility-1\] and serves as documentation that can be easily shared across the team, which will ensure design alignment.

## ADR-9: Use node.js version v22.x

Node.js is required for the Astro.js framework. At the time of project initiation, [node.js v22.17.0](https://nodejs.org/download/release/v22.17.0/) is the latest LTS version available. Using this version ensures the applications maintainability and sustainability.

The minor version of this node version will be incremented during development as and when new versions are available. See the [.nvmrc](../.nvmrc) file for the current version used.

## ADR-10: Use typescript

In order to make the long-term maintenance of the project reliable and efficient, TypeScript was chosen for its static typing, which will help catch errors early and improves overall code readability.

## ADR-11: Use the Astro.js web framework v5.11.1

[ADR-7](#adr-7-deploy-as-a-static-site) requires that the application is deployed as a static site. Many web frameworks can be used to develop static sites, with [Astro](https://astro.build/), [Gatsby](https://www.gatsbyjs.com/), [Hugo](https://gohugo.io/) and [Next.js](https://nextjs.org/) being evaluated. Astro was chosen for the following reasons:

- It is optimised for Static Site Generation (SSG), which prioritises Server-Side Rendering (SSR)
- It is well suited for a content-heavy application that has minimal dynamic content
- It sends zero JavaScript on render unless specified, which means it has improved load times and reduced band-width [performance-1] [performance-2]
- It is framework agnostic, which means that components can be built using React and integrated within Storybook

At the time of project initiation, [Astro.js v5.11.1](https://github.com/withastro/astro/releases/tag/astro%405.11.1) is the latest stable version available.

The minor version of this Astro.js version will be incremented during development as and when new versions are available. See the [package.json](../package.json) file for the current version used.

## ADR-12: Use Prettier and ESLint for linting and code-formatting

[Prettier](https://prettier.io) and [ESLint](https://eslint.org/) were adopted as tools within our project for linting and code-formatting respectively. Maintaining a clean and consistent codebase aids in future-proofing the project, which these tools will ensure. Prettier is an opinionated linter that focuses on enforcing consistent style. ESLint is a configurable code-formatter, which enforces best-practices and catches potential errors early. These tools were chosen since they are widely adopted, well-supported and together will cover all bases. See the [eslint.config.js](../eslint.config.js) file for the configuration and rules in use.

In order to make sure these two tools work harmoniously together, without styling rules from ESLint interferring with those applied through Prettier, the [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) plugin is used.

To ensure that both Prettier and ESLint recognise and handle Astro-specific files, the [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro) and community maintained [eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro) plugins were used (the latter of which also outlines the reccomended `eslint.config.js` as part of its documentation).
