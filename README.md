# Pandemic Preparedness Tool

The Pandemic Preparedness Toolkit (PPT) is a five-year project (2023 – 2028), funded by Wellcome, which aims to co-create a sustainable, online Toolkit that will build capacity for infectious disease surveillance in National Statistical Offices (NSOs). The UK Office for National Statistics (ONS) is collaborating with NSOs and Delivery Partners within Argentina, Malawi, and Nepal to co-develop the Toolkit.

This is an [Astro.js](https://astro.build/) project bootstrapped with [`npm create astro@latest`](https://docs.astro.build/en/tutorial/1-setup/2/). [Storybook](https://storybook.js.org/docs/get-started/frameworks/react-vite) is used to develop and test UI components in isolation.

## Requirements and initial setup

This project has the following dependencies:

- [aws cli](https://aws.amazon.com/cli/)
- [nvm](https://github.com/nvm-sh/nvm)

If you want to deploy assets you will also need an IAM user account for the project AWS account.

To install dependencies and configure the project for first use, follow the instructions below:

1. Open a terminal in the project root directory
2. Install dependencies using `brew`

```bash
brew install awscli nvm
```

3. Install the node version defined in the `.nvmrc` file using `nvm`

```bash
nvm install
```

4. Set the node version we want to use, if not already done by the installation

```bash
nvm use $(cat .nvmrc)
```

5. If you haven't already done so, [create access keys linked to your aws account](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-key-self-managed.html)

6. Using the aws cli, configure your aws profile using the access keys associated with your account.

```bash
aws configure
```

7. Install dependencies using npm

```bash
npm i --include-dev
```

8. Bundle the bootstrap JavaScript so it can be used by the app and Storybook

```bash
npm run build-bootstrap-js
```

9. Create a `.env` file and include env vars to ensure correct settings are loaded to support development. See the [.example-env](.example-env) and the [environment variables](#environment-variables) section below

The project is now ready for development or to use for deployments.

## Environment variables

The table below lists the environment variables used in this project and a description of how they are used.

| Variable | Default value | Description |
| - | - | - |
| STORYBLOK_ACCESS_TOKEN | - | Used to authenticate with the [Storyblok CMS content delivery API](https://www.storyblok.com/docs/api/content-delivery/v2). This token is required to fetch data from the Storyblok CMS and can be obtained from the project space settings within Storyblok. |
| ASTRO_OUTPUT | static | This is read by the [astro.config.mjs](./astro.config.mjs) file when the Astro project is configured and used to set the [output option](https://docs.astro.build/en/reference/configuration-reference/#output). This should be set to either `static` or `server`. If set to `static`, the site is built for static site generation (SSG) which is used for local development and the production deployment. If set to `server` the site is built for sever side rendering (SSR) which is used for the CMS preview deployment |
| ASTRO_PREVIEW | false | This is used within the [fetchContent](./src/helpers/fetchContent.ts) helpers. If set to `true` content is fetched from the Storyblok CMS content delivery API as draft, which is useful when we are previewing content. If set to `false` content is fetched as published, which is what we want when building the production deployment |
| PREVIEW_CDN_BASE_URL | - | This is read by the [astro.config.mjs](./astro.config.mjs) file when the Astro project is configured and used to set the [build.assetsPrefix option](https://docs.astro.build/en/reference/configuration-reference/#buildassetsprefix). If we are building for the `server` output for the CMS preview deployment, CSS and JS assets are served from a separate location. This var sets the base url of this location. |
| ASTRO_USE_LOCAL_DATA | true |This is used within the [fetchContent](./src/helpers/fetchContent.ts) helpers to set the client we are using to fetch content. If set to `true` content is not fetched from the Storyblok CMS content delivery API and loaded from static content files, which is useful when we are testing or developing locally. If set to `false` content is fetched from the Storyblok CMS content delivery API |

## Development server

To run the Astro.js development server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

To deploy your local app to a shared location:

```bash
npm run deploy-app-dev
```

Once this has built and deployed successfully, the Astro.js application will be available at an address defined by the AWS Cloudfront distribution.

## Storybook

To run Storybook development server:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

To deploy your local storybook to a shared location:

```bash
npm run deploy-storybook-dev
```

Once this has built and deployed successfully, Storybook will be available at an address defined by the AWS Cloudfront distribution.

## Linting and code formatting

This project uses [ESLint](https://eslint.org/) for code static analysis and linting.

To run ESLint locally:

```bash
npm run lint
```

## Static Search

A static search library, Pagefind, is used in the project to provide a lightweight, small footprint search facility.  Pagefind is implemented using the astro-pagefind library, which means the site is indexed automatically whenever the build step is run (i.e., within `npm run deploy-app-...`).  The indexed files are sent to the `dist/` directory ready to be deployed to CloudFront within the existing process.

## CI/CD workflows

This project uses GitHub Actions workflows for Continuous Integration and Continuous Deployment (CI/CD). Workflow statuses can be monitored in the GitHub Actions tab of the project repository. Any failing workflows will highlight issues with code and stop either merges to the main branch or errors or bugs being deployed.

### Pull request and push integration

The [main-pr-push-app.yml workflow](./.github/workflows/main-pr-push-app.yml) is configured to audit dependencies, run linting, run tests and automatically build code changes related to the project application code on every push or pull request targeting the main branch.

The [main-pr-push-iac.yml workflow](./.github/workflows/main-pr-push-iac.yml) is configured to validate and check the format of code changes related to the project Infrastructure as Code (IaC) on every push or pull request targeting the main branch.

### Push deployment

The [main-push-cd.yml workflow](./.github/workflows/main-push-cd.yml) is configured to build and deploy the Astro application and Storybook on every push that targets the main branch. Once deployed successfully, the Astro application and Storybook will be available at an address defined by the AWS Cloudfront distribution.

## Styling

The styling of the project is laid out such that:

- Global and element styles are loaded on every page
- Component-level styles are loaded and scoped to their respective components

The project uses [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) as the base CSS framework and is installed via npm. Bootstap's SCSS source files are imported directly from the `bootstrap` npm package into the application [index.scss](./src/styles/index.scss). Customizations to the Bootstrap variables are achieved through override files defined locally within `./src/styles/global/overrides/...`.

## Linting and code formatting

This project makes use of [Prettier](https://prettier.io) and [ESLint](https://eslint.org/) to apply linting and code-formatting rules respectively. Prettier automatically formats the codebase to ensure uniform style, while ESLint enforces coding standards specified by rules in `eslint.config.js`.

To run all the linting and code formatting (Prettier and ESLint together):

```bash
npm run lint
```

To run Prettier locally:

```bash
npm run lint:prettier
```
To run ESLint locally:

```bash
npm run lint:eslint
```

If using VSCode, you may wish to use the following `.vscode/setting.json` configuration to aid linting and formatting.

```
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  },
  "prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

This will do the following:
- Automatically formats your code using the default formatter on save
- Sets Prettier as the default code formatter
- Automatically organizes imports on save
- Ensures Prettier target files with the `.astro` extension
- Sets Prettier as the default formatter for `.astro` files

## Testing
[Vitest](https://vitest.dev/) is used as the testing suite for this project. Vitest is a suitable choice since Astro.js already uses vite under the hood for its build process.

To write tests for a component (e.g., `Component.tsx`), create a corresponding test file named `Component.test.tsx` or `Component.spec.tsx` in the same directory. Vitest will automatically detect and run these test files.

To run all the tests using vitest:

```bash
npm run test
```

## Storyblok CLI

The [Storyblok CLI](https://www.storyblok.com/docs/packages/storyblok-cli) is used to autogenerate interfaces for Storyblok CMS bloks that can be used when building corresponding components in source code, see the `src/types/storyblok.d.ts` and `src/types/bloks/storyblok-components.d.ts` files and CLI commmands in [package.json](package.json).

To use the Storyblok CLI you will need a Storyblok account for the project space. To autogenerate the interfaces follow the instructions below:

1. Open a terminal in the project root directory
2. Find the [Storyblok project space id](https://www.storyblok.com/faq/where-can-i-find-my-space-id) and export it as an environment variable

```bash
export STORYBLOK_SPACE_ID=<space id>
```
3. Login to the Storyblok CLI using either your username and password or a [personal access token](https://www.storyblok.com/docs/concepts/access-tokens#personal-access-token) using npm

```bash
npm run sb:login
```

4. Generate the interfaces using npm

```bash
npm run generate-storyblok-types
```

This will update the `src/types/storyblok.d.ts` and `src/types/bloks/storyblok-components.d.ts` files based on the current blok configurations on Storyblok.