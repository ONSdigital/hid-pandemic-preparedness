# Pandemic Preparedness Tool IaC

This is the Infrastructure-as-Code (IaC) for the Pandemic Preparedness Tool project.

## Requirements and initial setup

This IaC has the following dependencies:

- [aws cli](https://aws.amazon.com/cli/)
- [tfenv](https://github.com/tfutils/tfenv)

You will also need a IAM user for the project AWS account with the relevant permissions.

To install dependencies and configure the IaC for first use, follow the instructions below:

1. Open a terminal in the `/iac` directory
2. Install dependencies using `brew`

   ```
   $ brew install awscli tfenv
   ```

3. Install the terraform version defined in the `.terraform-version` file using `tfenv`

   ```
   $ tfenv install
   ```

4. Set the terraform version we want to use, if not already done by the installation

   ```
   $ tfenv use $(cat .terraform-version)
   ```

5. If you haven't already done so, [create access keys linked to your aws account](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-key-self-managed.html)

6. Using the aws cli, configure your aws profile using the access keys associated with your account.

   ```
   $ aws configure
   ```

7. The IaC code requires an input variable `domain_name` to set up SSL certificates and CloudFront distributions. This is available from project documentation and should be made available to Terraform using an environment variable

   ```
   $ export TF_VAR_domain_name=<domain_name>
   ```

8. The IaC code requires an input variable `storyblok_space_id` to set up the Codepipeline webhook. This is available from the Storyblok project space and should be made available to Terraform using an environment variable

   ```
   $ export TF_VAR_storyblok_space_id=<storyblok_space_id>
   ```

The IaC is now ready for development or to use for deployments.

## Provisioning resources

To provision resources on aws, run either `terraform plan`, `terraform apply` or `terraform destroy` in the `/iac` directory. See the [terraform documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-create) for more details.

This infrastructure is configured to do the following:

- Create a CloudFront function to use with Astro app deployments
- Create SSL certificates to attach domain names to CloudFront deployments and an API Gateway endpoint
- Create S3 buckets for Astro app and Storybook deployments
- Create CloudFront distributions to serve Astro app and storybook deployments
- Create Lambda functions to host Astro Server-side Rendering (SSR) node.js app for CMS preview, and to provide CloudFront distribution authentication
- Create API Gateways to provide endpoint to invoke lambda functions
- Create an IAM user and policies to allow Github actions workflows to build and sync Astro app and Storybook files to S3 buckets and update lambda function code
- Create a Secret Manager secret for the Storyblok access token and the authentication password
- Create a Code Build project and a Code Pipeline to deploy the production site
- Create a webhook connected to the Codepipeline that can be used to trigger the pipeline from an external source

## Secrets used by Github Actions

The infrastructure creates the IAM user, but does not create the access key and secret access key necessary for Github actions to authenticate with AWS as part of the workflow. Once the infrastructure has created the IAM user, this step must be done manually. To do this follow the steps below:

- [Create access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for the github actions IAM user
- Add these keys as [secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/using-secrets-in-github-actions). The access key should be stored as `AWS_ACCESS_KEY` and the secret key should be stored as `AWS_SECRET_ACCESS_KEY`

## Secrets in Secrets Manager

The infrastructure creates Secret Manager secrets, but does not create secret values. Once the infrastructure has created Secret Manager secrets, values must be created manually. To do this follow the [AWS docs](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) to create secret values according to the table below.

| Secret manager id | Used by | Secret value |
| - | - | - |
| environment-auth-password | Authorization lambda to authenticate an input password before allowing a user to view development environments | A `ENVIRONMENT_AUTH_PASSWORD` key and a value to be used as the password |
| storyblok-access-token | Codepipeline to build the deployment | A `STORYBLOK_ACCESS_TOKEN` key and a value corresponding with the access token available from the Storyblok project space |

The `environment-auth-password` can be changed if required, and the `hid-ppt-lambda-environment-auth` Lambda function will use this new value as part of the auth flow to create new authentication cookies. Remember that if you change this secret value in Secret Manager, **the hardcoded value for SECRET_KEY in the append-request CloudFront function must be changed to match as well**, otherwise the authentication flow will not work. This must be done manually as CloudFront functions cannot access secrets managed in Secret Manager. For further info see the section below.

## About appendRequest.js

The [appendRequest.js](./appendRequest.js) file is the code deployed as a CloudFront function called `append-request`. It is attached to the Astro static site CloudFront distributions and runs every time a request is received to theese distributions. It does two things:
 - Appends values to request paths to allow CloudFront to find the correct static files within the S3 buckets
 - If enabled, inspects incoming requests and verifies the presence and validity of an authentication cookie, and enforces access control by allowing or redirecting requests. See [ADR-18](../doc/architectural-decision-records/adr-18-use-aws-api-gateway-and-lambda-for-auth.md) for further info on this

### How to enable auth

When the `appendRequest.js` code is deployed using Terraform, **auth is disabled by default** and **some constants required for the auth to function are set to empty strings**. This is to ensure we are not saving any confidential data within source code.

CloudFront functions have limited functionality, and do not allow the setting of environment variables or accessing secrets using the methods we might use with a Lambda function. To enable auth, the source code must be modified using the AWS console.

Once the code has been deployed by Terraform, the follow vars at the top of the `append-request` function code should be set according to the table below.

| Variable | Default value | Description |
| - | - | - |
| AUTH_ENABLED | false | Set to `true` to enable auth |
| AUTH_URL | - | This should be the full url of the `hid-ppt-lambda-environment-auth` Lambda function that performs the login flow. If a request is not authenticated, `append-request` will redirect to this url. This url should also be on the same domain of the CloudFront distributions so the cookie set by the auth flow will apply |
| SECRET_KEY | - | The value of the secret used by the `hid-ppt-lambda-environment-auth` Lambda function to set the auth cookie. This should match the value stored as the `environment-auth-password` secret in Secret Manager |

