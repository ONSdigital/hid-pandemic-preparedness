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

The project is now ready for development or to use for deployments.

## Development server

To run the Astro.js development server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

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

Once this has built and deployed successfully Storybook will be available at http://hid-ppt-storybook-dev.s3-website.eu-west-2.amazonaws.com.

## Linting and code formatting

This project uses [ESLint](https://eslint.org/) for code static analysis and linting.

To run ESLint locally:

```bash
npm run lint
```

## CI/CD workflows

This project uses GitHub Actions workflows for Continuous Integration and Continuous Deployment (CI/CD). Workflow statuses can be monitored in the GitHub Actions tab of the project repository. Any failing workflows will highlight issues with code and stop either merges to the main branch or errors or bugs being deployed.

### Pull request and push integration

The [main-pr-push-app.yml workflow](./.github/workflows/main-pr-push-app.yml) is configured to audit dependencies, linting and automatically build code changes related to the project application code on every push or pull request targeting the main branch.

The [main-pr-push-iac.yml workflow](./.github/workflows/main-pr-push-iac.yml) is configured to validate and check the format of code changes related to the project Infrastructure as Code (IaC) on every push or pull request targeting the main branch.

### Push deployment

The [main-push-cd.yml workflow](./.github/workflows/main-push-cd.yml) is configured to build and deploy Storybook on every push targeting the main branch. Once deployed successfully Storybook will be available at at an address defined by the AWS Cloudfront distribution.

## Styling

The styling of the project is laid out such that:

- [Inverted Triangle CSS (ITCSS)](https://www.freecodecamp.org/news/managing-large-s-css-projects-using-the-inverted-triangle-architecture-3c03e4b1e6df/) principles are followed
- Global and element styles are loaded on every page
- Component-level styles are loaded and scoped to their respective components
