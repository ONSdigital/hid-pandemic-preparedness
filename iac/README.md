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
- Create Lambda function to host Astro Server-side Rendering (SSR) node.js app for CMS preview
- Create API Gateway to provide endpoint to invoke lambda function
- Create an IAM user and policies to allow Github actions workflows to build and sync Astro app and Storybook files to S3 buckets and update lambda function code
- Create a Secret Manager secret for the Storyblok access token
- Create a Code Build project and a Code Pipeline to deploy the production site
- Create a webhook connected to the Codepipeline that can be used to trigger the pipeline from an external source

The infrastructure creates the IAM user, but does not create the access key and secret access key necessary for Github actions to authenticate with AWS as part of the workflow. Once the infrastructure has created the IAM user, this step must be done manually. To do this follow the steps below:

- [Create access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for the github actions IAM user
- Add these keys as [secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/using-secrets-in-github-actions). The access key should be stored as `AWS_ACCESS_KEY` and the secret key should be stored as `AWS_SECRET_ACCESS_KEY`

The infrastructure creates Secret Manager secrets, but does not create secret values. Once the infrastructure has created Secret Manager secrets, values must be created manually. To do this follow the [AWS docs](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) to create secret values according to the table below.

| Secret manager id | Used by | Secret value |
| - | - | - |
| environment-auth-password | Authorization lambda to authenticate an input password before allowing a user to view development environments | A `ENVIRONMENT_AUTH_PASSWORD` key and a value to be used as the password |
| storyblok-access-token | Codepipeline to build the deployment | A `STORYBLOK_ACCESS_TOKEN` key and a value corresponding with the access token available from the Storyblok project space |