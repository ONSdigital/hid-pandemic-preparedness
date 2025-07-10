# Pandemic Preparedness Tool IaC

This is the Infrastructure-as-Code (IaC) for the Pandemic Preparedness Tool project.

## Requirements and initial setup

This project has the following dependencies:

- [aws cli](https://aws.amazon.com/cli/)
- [tfenv](https://github.com/tfutils/tfenv)

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
