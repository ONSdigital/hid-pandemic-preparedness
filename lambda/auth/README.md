# Lambda auth files

These files are zipped into an archive and deployed as part of the `hid-ppt-lambda-environment-auth` authentication Lambda function, see [scripts/deployAuth.sh](../../scripts/deployAuth.sh).
 - [package.json](./package.json) and [package-lock.json](./package-lock.json) provides dependencies required by the Lambda function to generate JWTs and render html pages
 - [templates/](./templates/) includes the html pages used by the Lambda function to provide the authentication flow
 - [handler.mjs](./handler.mjs) forms the Lambda function business logic

The configuration of this Lambda function is managed via Terraform see the `aws_lambda_function_auth` resource in [iac/main.tf](../../iac/main.tf).

The table below lists the environment variables required by the Lambda and a description of how they are used. These variables are set when the function is created in Terraform so should not need to be changed.

| Variable | Default value | Description |
| - | - | - |
| AWS_REGION | - | Not set by Terraform but provided as a built-in env var by Lambda. Used when fetching the authentication secret via Secrets Manager |
| LOG_LEVEL | info | Not directly used within the logic of the Lambda function but used to set the logging level when debugging |
| SECRET_ID | - | The id of the secret we are fetching from Secrets Manager. Set by Terraform when the Lambda is configured |