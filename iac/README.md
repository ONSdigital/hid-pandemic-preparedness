# Pandemic Preparedness Tool IaC

This is the Infrastructure-as-Code (IaC) for the Pandemic Preparedness Tool project.

## Requirements and initial setup

This project has the following dependencies:

- [aws cli](https://aws.amazon.com/cli/)
- [tfenv](https://github.com/tfutils/tfenv)

To install dependencies and configure the IaC for first use, follow the instructions below:

1. Open a terminal in the `/iac` directory
2. Install dependencies using `brew`

   `$ brew upgrade && brew install awscli tfenv`

3. Install the terraform version defined in the `.terraform-version` file using `tfenv`

   `$ tfenv install`

4. Set the terraform version we want to use, if not already done by the installation

   `$ tfenv use $(cat .terraform-version)`

The project is now ready for development or to use for deployments.
