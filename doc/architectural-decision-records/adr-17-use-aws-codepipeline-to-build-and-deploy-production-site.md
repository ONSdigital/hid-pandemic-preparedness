# ADR-17: Use AWS Codepipeline to build and deploy production site

## Related NFRs

[development-5][1], [security-5][2]

## Rationale

The application already uses [github actions for CI/CD pipelines](./adr-3-use-github-actions-for-cicd-pipelines.md), which includes deploying the static Astro web application and the server-side rendered application for the Content Management System (CMS) preview. When content creators are inputting content using the Storyblok CMS, any production site content needs to be updated when content in published. As the application is [deployed as a static site](./adr-7-deploy-as-a-static-site.md), this means the static site pages will need to be built every time published content changes. Storyblok provides a [webhook mechanism](https://www.storyblok.com/docs/concepts/webhooks) to notify external services of events, such as when content is published or updated. These webhooks can be used to trigger a build process to build the site and publish the updated content.

As the application already uses github actions for CI/CD pipelines, the preferable option would be to trigger a deployment pipeline provided by github actions using a Storyblok webhook. This was not possible as any triggering of a github action using the github API [requires an authenticated request](https://docs.github.com/en/rest/actions/workflows?apiVersion=2022-11-28), and Storyblok webhooks cannot be configured to include an Authorization/Bearer token as part of the request header. Therefore a different deployment solution was required.

A solution using both existing github actions CI/CD workflows and [AWS Codepipeline](https://aws.amazon.com/codepipeline/) was developed to deploy the production site. A diagram of this implementation is shown below:

![Diagram showing how the production deployment pipeline works using AWS Codepipeline.](../images/aws-codepipelines-deployment-diagram.png)

A new Github actions workflow was created for production deployment see [.github/workflows/main-release-cd.yml](.github/workflows/main-release-cd.yml). This workflow is configured to be run when a release is created in the repository. This workflow deploys the CMS preview server side rendered application, and also archives the application source code and pushes it to an S3 bucket. This S3 bucket is then used as the source for the AWS Codepipeline deployment pipeline.

The AWS Codepipeline is configured to be triggered by a webhook, either from Storyblok or Github actions. Once triggered, the deployment pipeline builds the Astro static site whilst fetching published content from Storyblok and deploys to a production S3 bucket for distribution using CloudFront.

[1]: ../non-functional-requirements/development.md#development-2
[2]: ../non-functional-requirements/security.md#development-6
