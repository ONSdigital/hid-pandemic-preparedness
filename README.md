# Pandemic Preparedness Tool ( now Analysis for Action )

The Pandemic Preparedness Toolkit (PPT) ( now Analysis for Action (AfA)) is a five-year project (2023 – 2028), funded by Wellcome, which aims to co-create a sustainable, online Toolkit that will build capacity for infectious disease surveillance in National Statistical Offices (NSOs). The UK Office for National Statistics (ONS) is collaborating with NSOs and Delivery Partners within Argentina, Malawi, and Nepal to co-develop the Toolkit.

This is an [Astro.js](https://astro.build/) project bootstrapped with [`npm create astro@latest`](https://docs.astro.build/en/tutorial/1-setup/2/). [Storybook](https://storybook.js.org/docs/get-started/frameworks/react-vite) is used to develop and test UI components in isolation.

# Setup and deployment notes

This section documents the current local setup and deployment flow for the `hid-pandemic-preparedness` project.

It reflects the current `package.json` scripts and `scripts/deploy.sh` behaviour.

---

## Prerequisites

The project requires:

- Node.js
- npm
- AWS CLI
- Access to the relevant AWS account and S3 buckets

Create a `.env` file and include env vars to ensure correct settings are loaded to support development. See the [.example-env](.example-env) and the [environment variables](#environment-variables) section below

There are two supported ways to manage Node locally, depending on your environment. With the Conda setup being the only suitable one as of 2026 for ONS Macbooks.

---

## Recommended Quick setup

For Conda-based setup:

```zsh
conda install conda-forge::awscli
conda create -n node22 nodejs=22
conda activate node22
node -v
npm -v
npm install --include=dev
aws configure
aws sts get-caller-identity
npm run dev
```

For deployment to development:

```zsh
conda activate node22
npm run deploy-app-dev
```

For deployment to main:

```zsh
conda activate node22
npm run deploy-app-main
```

To run Storybook development server:

```zsh
npm run storybook
```

For deployment to storybook dev:

```zsh
npm run deploy-storybook-dev
```

For deployment to storybook main:

```zsh
npm run deploy-storybook-main
```

To run ESLint locally:

```zsh
npm run lint
```

To run all the tests using vitest:

```zsh
npm run test
```

## More detailed setup

## Option 1: Conda setup (preferred method for corporate macbooks 2026)

Use this option if you are working on an environment where Conda is the approved way to manage tooling.

Install awscli via Conda:

```zsh
conda install conda-forge::awscli
```

Create a Conda environment with Node.js 22:

```zsh
conda create -n node22 nodejs=22
```

Activate the environment:

```zsh
conda activate node22
```

Check Node and npm are available:

```zsh
node -v
npm -v
```

You should see Node and npm versions returned.

If you are using VS Code, make sure the Conda environment is activated in the VS Code integrated terminal before running npm commands:

```zsh
conda activate node22
```

You can check which Node/npm your terminal is using with:

```zsh
which node
which npm
```

Expected output should point to the Conda environment, for example:

```text
/opt/miniconda3/envs/node22/bin/node
/opt/miniconda3/envs/node22/bin/npm
```

### Shell note: zsh and bash

It is fine to use zsh as your day-to-day terminal on macOS.

Some project scripts run using bash, for example:

```bash
bash ./scripts/deploy.sh dist/ hid-ppt-app-dev
```

If you activate the Conda environment in zsh first, bash scripts launched from that same terminal session inherit the active environment and can still use Node and npm.

For example:

```text
zsh
└── conda activate node22
    └── npm run deploy-app-dev
        └── bash ./scripts/deploy.sh ...
            └── node/npm remain available
```

The problem only occurs if a new terminal session is opened and the Conda environment has not been activated.

---

## Option 2: nvm setup

Use this option if you are working in an environment where nvm is permitted.

Install the Node version specified by the project in the `.nvmrc`:

```zsh
nvm install
```

Use that Node version:

```zsh
nvm use
```

Check Node and npm are available:

```zsh
node -v
npm -v
```

If your organisation uses Conda as the required tooling approach, use the Conda setup instead of nvm.

---

## Install project dependencies

After activating the correct Node environment, install the project dependencies:

```zsh
npm install --include=dev
```

You can view available project scripts with:

```zsh
npm run
```

---

## Run the project locally

Start the Astro development server:

```zsh
npm run dev
```

---

## Build the project ( Only needed for validating build as its included in the deployment scripts )

Run for:

- Checking the project compiles successfully
- Catching TypeScript/build errors before deploying
- Generating a local dist/ folder for inspection
- Troubleshooting CI/deployment issues

Build the Astro application:

```zsh
npm run build
```

This generates a production build in:

```text
dist/
```

---

## AWS CLI setup

The deployment scripts use the AWS CLI to sync built files to S3.

If you haven't already done so, [create access keys linked to your aws account](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-key-self-managed.html)

Configure your AWS profile using the access keys associated with your account:

```zsh
aws configure
```

You will be prompted for:

```text
AWS Access Key ID
AWS Secret Access Key
Default region name
Default output format
```

For the default output format, `json` is usually fine:

```text
json
```

For region, use the region associated with the relevant AWS resources. The deployment script currently assumes S3 origins in:

```text
eu-west-2
```

This can be seen in `scripts/deploy.sh`:

```bash
BUCKET_ORIGIN="${BUCKET_NAME}.s3.eu-west-2.amazonaws.com"
```

### Check AWS CLI is configured correctly

Run:

```zsh
aws sts get-caller-identity
```

If configured correctly, this returns the AWS account and identity details for the configured credentials.

You can also check the loaded AWS CLI configuration with:

```zsh
aws configure list
```

To check access to the relevant development bucket:

```zsh
aws s3 ls s3://hid-ppt-app-dev
```

To check access to the relevant main bucket:

```zsh
aws s3 ls s3://hid-ppt-app-main
```

---

## Deployment commands

The deployment scripts are defined in `package.json`.

### Deploy app to development

```zsh
npm run deploy-app-dev
```

This runs:

```zsh
npm run build && bash ./scripts/deploy.sh dist/ hid-ppt-app-dev
```

### Deploy app to main

```zsh
npm run deploy-app-main
```

This runs:

```zsh
npm run build && bash ./scripts/deploy.sh dist/ hid-ppt-app-main
```

### Deploy Storybook to development

```zsh
npm run deploy-storybook-dev
```

This runs:

```zsh
npm run build-storybook && bash ./scripts/deploy.sh storybook-static/ hid-ppt-storybook-dev
```

### Deploy Storybook to main

```zsh
npm run deploy-storybook-main
```

This runs:

```zsh
npm run build-storybook && bash ./scripts/deploy.sh storybook-static/ hid-ppt-storybook-main
```

---

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

## Static Search

A static search library, Pagefind, is used in the project to provide a lightweight, small footprint search facility. Pagefind is implemented using the astro-pagefind library, which means the site is indexed automatically whenever the build step is run (i.e., within `npm run deploy-app-...`). The indexed files are sent to the `dist/` directory ready to be deployed to CloudFront within the existing process.

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

## Environment variables

The table below lists the environment variables used in this project and a description of how they are used.

| Variable | Default value | Description |
| - | - | - |
| STORYBLOK_ACCESS_TOKEN | - | Used to authenticate with the [Storyblok CMS content delivery API](https://www.storyblok.com/docs/api/content-delivery/v2). This token is required to fetch data from the Storyblok CMS and can be obtained from the project space settings within Storyblok. |
| ASTRO_OUTPUT | static | This is read by the [astro.config.mjs](./astro.config.mjs) file when the Astro project is configured and used to set the [output option](https://docs.astro.build/en/reference/configuration-reference/#output). This should be set to either `static` or `server`. If set to `static`, the site is built for static site generation (SSG) which is used for local development and the production deployment. If set to `server` the site is built for sever side rendering (SSR) which is used for the CMS preview deployment |
| ASTRO_PREVIEW | false | This is used within the [fetchContent](./src/helpers/fetchContent.ts) helpers. If set to `true` content is fetched from the Storyblok CMS content delivery API as draft, which is useful when we are previewing content. If set to `false` content is fetched as published, which is what we want when building the production deployment |
| PREVIEW_CDN_BASE_URL | - | This is read by the [astro.config.mjs](./astro.config.mjs) file when the Astro project is configured and used to set the [build.assetsPrefix option](https://docs.astro.build/en/reference/configuration-reference/#buildassetsprefix). If we are building for the `server` output for the CMS preview deployment, CSS and JS assets are served from a separate location. This var sets the base url of this location. |
| ASTRO_USE_LOCAL_DATA | true |This is used within the [fetchContent](./src/helpers/fetchContent.ts) helpers to set the client we are using to fetch content. If set to `true` content is not fetched from the Storyblok CMS content delivery API and loaded from static content files, which is useful when we are testing or developing locally. If set to `false` content is fetched from the Storyblok CMS content delivery API |

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

---

## What deployment does

The app deployment flow is:

```text
npm run deploy-app-dev
│
├── npm run build
│   └── astro build
│       └── dist/
│
└── bash scripts/deploy.sh dist/ hid-ppt-app-dev
    │
    └── aws s3 sync dist/ s3://hid-ppt-app-dev --delete
```

The infrastructure flow is:

```text
Astro build
    ↓
dist/
    ↓
S3 bucket
    ↓
CloudFront
```

For `deploy-app-dev`, the built application is synced to:

```text
s3://hid-ppt-app-dev
```

For `deploy-app-main`, the built application is synced to:

```text
s3://hid-ppt-app-main
```

The script then checks CloudFront distributions and prints the CloudFront domain for the bucket origin:

```zsh
aws cloudfront list-distributions
```

At the end of a successful deployment, it prints:

```text
Deployment and invalidation complete. Updated site is available at https://<cloudfront-domain>.
```

---

## CloudFront invalidation behaviour

The deployment script contains invalidation logic, but it is currently disabled:

```zsh
ENABLE_INVALIDATIONS="false"
```

This means the script syncs the latest files to S3, but does not currently clear the CloudFront cache.

If a deployment succeeds but the visible site does not update immediately, it may be because CloudFront is still serving cached files.

If invalidations are required in future, the deployment script already contains logic to:

1. Detect changed files from the S3 sync output
2. Find the CloudFront distribution linked to the bucket origin
3. Create invalidations for changed paths

However, this only runs if:

```zsh
ENABLE_INVALIDATIONS="true"
```

---

## Bootstrap JavaScript note

The README previously referenced:

```zsh
npm run build-bootstrap-js
```

This script does not exist in the current `package.json`.

Bootstrap JavaScript is now imported through the app and Storybook build process.

In the app layout:

```astro
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js?url";
```

In Storybook:

```ts
import "bootstrap/dist/js/bootstrap.bundle";
```

Because of this, there is no separate Bootstrap JavaScript bundling step to run.

The current build flow is:

```zsh
npm run build
```

and the current deploy flow is:

```zsh
npm run deploy-app-dev
```

or:

```zsh
npm run deploy-app-main
```

---

## Useful troubleshooting commands

Check which shell you are using:

```zsh
ps -p $$
```

Check the configured login shell:

```zsh
echo $SHELL
```

Check whether the Conda environment is active:

```zsh
conda info --envs
```

Check Node and npm paths:

```zsh
which node
which npm
```

Check AWS identity:

```zsh
aws sts get-caller-identity
```

Check AWS CLI configuration:

```zsh
aws configure list
```

Check S3 bucket access:

```zsh
aws s3 ls s3://hid-ppt-app-dev
```

Check CloudFront access:

```zsh
aws cloudfront list-distributions
```
