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

   `$ brew install awscli tfenv`

3. Install the terraform version defined in the `.terraform-version` file using `tfenv`

   `$ tfenv install`

4. Set the terraform version we want to use, if not already done by the installation

   `$ tfenv use $(cat .terraform-version)`

5. If you haven't already done so, [create access keys linked to your aws account](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-key-self-managed.html)

6. Using the aws cli, configure your aws profile using the access keys associated with your account.

   `$ aws configure`

The IaC is now ready for development or to use for deployments.

## Provisioning resources

To provision resources on aws, run either `terraform plan`, `terraform apply` or `terraform destroy` in the `/iac` directory. See the [terraform documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-create) for more details.

This infrastructure is configured to do the following:

- Create a Cloudfront function to use with Astro app deployments
- Create S3 buckets for Astro app and Storybook deployments
- Create Cloudfront distributions to serve Astro app and storybook deployments
- Create Lambda function to host Astro Server-side Rendering (SSR) node.js app for CMS preview
- Create API Gateway to provide endpoint to invoke lambda function
- Create an IAM user and policies to allow Github actions workflows to build and sync Astro app and Storybook files to S3 buckets and update lambda function code

The infrastructure creates the IAM user, but does not create the access key and secret access key necessary for Github actions to authenticate with AWS as part of the workflow. Once the infrastructure has created the IAM user, this step must be done manually. To do this follow the steps below:

- [Create access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for the github actions IAM user
- Add these keys as [secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/using-secrets-in-github-actions). The access key should be stored as `AWS_ACCESS_KEY` and the secret key should be stored as `AWS_SECRET_ACCESS_KEY`
