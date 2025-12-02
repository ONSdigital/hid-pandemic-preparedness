terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  backend "s3" {
    bucket = "hid-ppt-tf-state"
    key    = "terraform.tfstate"
    region = "eu-west-2"
  }

  required_version = "~> 1.12.2"
}

# Create cloudfront function required for astro app deployments
resource "aws_cloudfront_function" "aws_cloudfront_function" {
  name    = "append-request"
  runtime = "cloudfront-js-2.0"
  comment = "Appends index.html to request uri so astro static site folder structure can be used for navigation"
  publish = true
  code    = file("${path.module}/appendRequest.js")
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

# Set up ssl certificate for cloudfront distributions
resource "aws_acm_certificate" "cloudfront_certificate" {
  # Needs to be us-east-1 region for certificates attached to cloudfront
  provider    = aws.us_east_1
  domain_name = var.domain_name
  subject_alternative_names = [
    "www.${var.domain_name}",
    "staging.${var.domain_name}"
  ]
  validation_method = "DNS"
}

provider "aws" {
  alias  = "eu_west_2"
  region = "eu-west-2"
}

# Set up ssl certificate for api gateway endpoints distributions
resource "aws_acm_certificate" "api_gateway_certificate" {
  # Needs to be same region as api gateway
  provider          = aws.eu_west_2
  domain_name       = "preview.${var.domain_name}"
  validation_method = "DNS"
}

# Create bucket for storybook dev
module "storybook_dev_s3" {
  source                     = "./s3"
  bucket_name                = "${var.project_name_prefix}-storybook-dev"
  configure_for_site_hosting = false
  force_destroy              = true
}

# Set up cloudfront distribution for storybook dev
# Default root object required for storybook as deployed as SPA
module "storybook_dev_cloudfront" {
  source                      = "./cloudfront"
  bucket_name                 = module.storybook_dev_s3.id
  bucket_regional_domain_name = module.storybook_dev_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Dev storybook"
  default_root_object         = "index.html"
  long_cache_path_pattern     = "assets/*"
  viewer_certificate = {
    cloudfront_default_certificate = true
  }
}

# Create bucket for storybook main
module "storybook_main_s3" {
  source                     = "./s3"
  bucket_name                = "${var.project_name_prefix}-storybook-main"
  configure_for_site_hosting = false
  force_destroy              = true
}

# Set up cloudfront distribution for storybook main
# Default root object required for storybook as deployed as SPA
module "storybook_main_cloudfront" {
  source                      = "./cloudfront"
  bucket_name                 = module.storybook_main_s3.id
  bucket_regional_domain_name = module.storybook_main_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Main storybook"
  default_root_object         = "index.html"
  long_cache_path_pattern     = "assets/*"
  viewer_certificate = {
    cloudfront_default_certificate = true
  }
}

# Create bucket for app dev
module "app_dev_s3" {
  source                     = "./s3"
  bucket_name                = "${var.project_name_prefix}-app-dev"
  configure_for_site_hosting = true
  force_destroy              = true
}

# Set up cloudfront distribution for app dev
# Function association is enabled to enable astro static site folder based navigation
module "app_dev_cloudfront" {
  source                      = "./cloudfront"
  bucket_name                 = module.app_dev_s3.id
  bucket_regional_domain_name = module.app_dev_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Dev app"
  function_association = [
    {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.aws_cloudfront_function.arn
    }
  ]
  long_cache_path_pattern = "_astro/*"
  viewer_certificate = {
    cloudfront_default_certificate = true
  }
}

# Create bucket for app main
module "app_main_s3" {
  source                     = "./s3"
  bucket_name                = "${var.project_name_prefix}-app-main"
  configure_for_site_hosting = true
  force_destroy              = true
}

# Set up cloudfront distribution for app main
# Function association is enabled to enable astro static site folder based navigation
# Price class and restrictions are set to ensure worldwide availability
module "app_main_cloudfront" {
  source                      = "./cloudfront"
  aliases                     = ["staging.${var.domain_name}"]
  bucket_name                 = module.app_main_s3.id
  bucket_regional_domain_name = module.app_main_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Main app"
  function_association = [{
    event_type   = "viewer-request"
    function_arn = aws_cloudfront_function.aws_cloudfront_function.arn
  }]
  geo_restriction = [{
    restriction_type = "none"
    locations        = []
  }]
  long_cache_path_pattern = "_astro/*"
  price_class             = "PriceClass_All"
  viewer_certificate = {
    acm_certificate_arn      = aws_acm_certificate.cloudfront_certificate.arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  depends_on = [aws_acm_certificate.cloudfront_certificate]
}

# Create an s3 bucket for Storyblok preview SSR assets
module "app_preview_s3" {
  source                     = "./s3"
  bucket_name                = "${var.project_name_prefix}-app-preview"
  configure_for_site_hosting = true
  force_destroy              = true
}

# Set up cloudfront distribution for Storyblok preview SSR assets
module "app_preview_cloudfront" {
  source                      = "./cloudfront"
  bucket_name                 = module.app_preview_s3.id
  bucket_regional_domain_name = module.app_preview_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Preview assets"
  default_root_object         = "index.html"
  long_cache_path_pattern     = "_astro/*"
  viewer_certificate = {
    cloudfront_default_certificate = true
  }
}

# Create an s3 bucket to contain app source files for CodePipeline build
module "app_source_s3" {
  source                          = "./s3"
  bucket_name                     = "${var.project_name_prefix}-app-source"
  configure_for_site_hosting      = false
  force_destroy                   = true
  versioning_configuration_status = "Enabled"
}

# Create bucket for app prod
module "app_prod_s3" {
  source                     = "./s3"
  bucket_name                = "${var.project_name_prefix}-app-prod"
  configure_for_site_hosting = true
  force_destroy              = true
}

# Set up cloudfront distribution for app prod
# Function association is enabled to enable astro static site folder based navigation
# Price class and restrictions are set to ensure worldwide availability
module "app_prod_cloudfront" {
  source                      = "./cloudfront"
  aliases                     = [var.domain_name, "www.${var.domain_name}"]
  bucket_name                 = module.app_prod_s3.id
  bucket_regional_domain_name = module.app_prod_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Prod app"
  function_association = [{
    event_type   = "viewer-request"
    function_arn = aws_cloudfront_function.aws_cloudfront_function.arn
  }]
  geo_restriction = [{
    restriction_type = "none"
    locations        = []
  }]
  long_cache_path_pattern = "_astro/*"
  price_class             = "PriceClass_All"
  viewer_certificate = {
    acm_certificate_arn      = aws_acm_certificate.cloudfront_certificate.arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  depends_on = [aws_acm_certificate.cloudfront_certificate]
}

# IAM role for Lambda execution
data "aws_iam_policy_document" "aws_iam_policy_document_lambda_execution" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "aws_iam_role_lambda" {
  name               = "${var.project_name_prefix}-lambda-execution-role"
  assume_role_policy = data.aws_iam_policy_document.aws_iam_policy_document_lambda_execution.json
}

# Get the zipped auth Lambda function code
data "local_file" "auth_deployment_zip" {
  filename = "${path.module}/../auth-lambda.zip"
}

# Lamba function for environment authentication
resource "aws_lambda_function" "aws_lambda_function_auth" {
  filename         = data.local_file.auth_deployment_zip.filename
  function_name    = "${var.project_name_prefix}-lambda-environment-auth"
  role             = aws_iam_role.aws_iam_role_lambda.arn
  handler          = "handler.handler"
  source_code_hash = data.local_file.auth_deployment_zip.content_base64sha256

  runtime     = "nodejs22.x"
  memory_size = 1024
  timeout     = 30
}

# A dedicated HTTP(S) endpoint for a Lambda function to enable direct invocation via HTTP requests
resource "aws_lambda_function_url" "aws_lambda_function_url" {
  function_name      = aws_lambda_function.aws_lambda_function_auth.function_name
  authorization_type = "NONE"
}

# Package the preview Lambda function code
data "archive_file" "astro_ssr_deployment_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/"
  output_path = "${path.module}/../astro-ssr-lambda.zip"
}

# Lambda function for CMS preview deployment
resource "aws_lambda_function" "aws_lambda_function_preview" {
  filename         = data.archive_file.astro_ssr_deployment_zip.output_path
  function_name    = "${var.project_name_prefix}-lambda-storyblok-preview"
  role             = aws_iam_role.aws_iam_role_lambda.arn
  handler          = "handler.handler"
  source_code_hash = data.archive_file.astro_ssr_deployment_zip.output_base64sha256

  runtime     = "nodejs22.x"
  memory_size = 1024
  timeout     = 30

  environment {
    variables = {
      ASTRO_PREVIEW        = "true"
      ASTRO_USE_LOCAL_DATA = "false"
      NODE_ENV             = "production"
      LOG_LEVEL            = "info"
    }
  }
}

# Api gateway for CMS preview deployment
resource "aws_apigatewayv2_api" "aws_apigatewayv2_api" {
  name          = "${var.project_name_prefix}-api-storyblok-preview"
  description   = "Provides endpoint for Astro SSR CMS preview"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "aws_apigatewayv2_integration" {
  api_id             = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  integration_type   = "AWS_PROXY"
  description        = "Integration to invoke storyblok preview lambda"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.aws_lambda_function_preview.invoke_arn
}

resource "aws_apigatewayv2_route" "aws_apigatewayv2_route" {
  api_id    = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.aws_apigatewayv2_integration.id}"
}

resource "aws_apigatewayv2_route" "aws_apigatewayv2_route_2" {
  api_id    = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  route_key = "ANY /"
  target    = "integrations/${aws_apigatewayv2_integration.aws_apigatewayv2_integration.id}"
}

resource "aws_apigatewayv2_stage" "aws_apigatewayv2_stage" {
  api_id      = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_domain_name" "aws_apigatewayv2_domain_name" {
  domain_name = "preview.${var.domain_name}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.api_gateway_certificate.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  depends_on = [aws_acm_certificate.api_gateway_certificate]
}

resource "aws_apigatewayv2_api_mapping" "aws_apigatewayv2_api_mapping" {
  api_id      = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  domain_name = aws_apigatewayv2_domain_name.aws_apigatewayv2_domain_name.id
  stage       = aws_apigatewayv2_stage.aws_apigatewayv2_stage.id
}

# Permission for API Gateway to invoke Lambda
resource "aws_lambda_permission" "aws_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.aws_lambda_function_preview.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.aws_apigatewayv2_api.execution_arn}/*/*"
}

# Attach cors policy to preview s3 bucket so assets can be requested from the deployed site
resource "aws_s3_bucket_cors_configuration" "aws_s3_bucket_cors_configuration" {
  bucket = module.app_preview_s3.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = [
      aws_apigatewayv2_api.aws_apigatewayv2_api.api_endpoint,
      "https://${aws_apigatewayv2_domain_name.aws_apigatewayv2_domain_name.id}"
    ]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

# Create iam user for automated deployments via github actions
resource "aws_iam_user" "aws_iam_user" {
  name          = "github-actions"
  force_destroy = true
}

data "aws_iam_policy_document" "aws_iam_policy_document_s3" {
  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
      "s3:GetObject",
      "s3:GetObjectAcl",
      "s3:DeleteObject",
      "s3:ListBucket"
    ]
    resources = [
      module.storybook_main_s3.arn,
      "${module.storybook_main_s3.arn}/*",
      module.app_main_s3.arn,
      "${module.app_main_s3.arn}/*",
      module.app_preview_s3.arn,
      "${module.app_preview_s3.arn}/*",
      module.app_source_s3.arn,
      "${module.app_source_s3.arn}/*",
    ]
  }
}

resource "aws_iam_policy" "aws_iam_policy" {
  name        = "github-actions-s3-access"
  description = "Allow S3 access to specific buckets"
  policy      = data.aws_iam_policy_document.aws_iam_policy_document_s3.json
}

resource "aws_iam_user_policy_attachment" "aws_iam_user_policy_attachment_s3" {
  user       = aws_iam_user.aws_iam_user.name
  policy_arn = aws_iam_policy.aws_iam_policy.arn
}

data "aws_iam_policy_document" "aws_iam_policy_document_cloudfront" {
  statement {
    effect = "Allow"
    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:ListDistributions"
    ]
    resources = [
      "*"
    ]
  }
}

resource "aws_iam_policy" "aws_iam_policy_cloudfront" {
  name        = "github-actions-cloudfront-access"
  description = "Allow cloudfront access to list distributions and create invalidations"
  policy      = data.aws_iam_policy_document.aws_iam_policy_document_cloudfront.json
}

resource "aws_iam_user_policy_attachment" "aws_iam_user_policy_attachment_cloudfront" {
  user       = aws_iam_user.aws_iam_user.name
  policy_arn = aws_iam_policy.aws_iam_policy_cloudfront.arn
}

data "aws_iam_policy_document" "aws_iam_policy_document_lambda" {
  statement {
    effect = "Allow"
    actions = [
      "lambda:InvokeFunction",
      "lambda:UpdateFunctionCode"
    ]
    resources = [
      aws_lambda_function.aws_lambda_function_preview.arn
    ]
  }
}

resource "aws_iam_policy" "aws_iam_policy_lambda" {
  name        = "github-actions-lambda-access"
  description = "Allow lambda access to push new function zip archives"
  policy      = data.aws_iam_policy_document.aws_iam_policy_document_lambda.json
}

resource "aws_iam_user_policy_attachment" "aws_iam_user_policy_attachment_lambda" {
  user       = aws_iam_user.aws_iam_user.name
  policy_arn = aws_iam_policy.aws_iam_policy_lambda.arn
}

# Create the secret for Storyblok access token
# Note that the secret version should be created manually in the AWS console
resource "aws_secretsmanager_secret" "aws_secretsmanager_storyblok_access_token" {
  name = "storyblok-access-token"
}

# Create the secret for auth wrapper password
# Note that the secret version should be created manually in the AWS console
resource "aws_secretsmanager_secret" "aws_secretsmanager_environment_auth_password" {
  name = "environment-auth-password"
}

# IAM role for Code build and Codepipeline execution
data "aws_iam_policy_document" "aws_iam_policy_document_codepipeline_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com", "codepipeline.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "aws_iam_role_codepipeline" {
  name               = "${var.project_name_prefix}-codepipeline-execution-role"
  assume_role_policy = data.aws_iam_policy_document.aws_iam_policy_document_codepipeline_assume_role.json
}

# Create the codebuild project
resource "aws_codebuild_project" "aws_codebuild_project" {
  name = "${var.project_name_prefix}-codebuild-project"

  source {
    type      = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/standard:7.0"
    type         = "LINUX_CONTAINER"
  }

  service_role = aws_iam_role.aws_iam_role_codepipeline.arn
}

# Add pipeline execution permissions for the role
data "aws_iam_policy_document" "aws_iam_policy_document_codepipeline_execution" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketVersioning",
      "s3:GetBucketAcl",
      "s3:GetBucketLocation",
      "s3:GetObjectTagging",
      "s3:GetObjectVersionTagging",
      "s3:ListBucket",
      "s3:PutObject"
    ]
    resources = [
      module.app_source_s3.arn,
      "${module.app_source_s3.arn}/*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
      "s3:PutObjectVersionAcl",
      "s3:GetBucketVersioning",
      "s3:GetBucketAcl",
      "s3:GetBucketLocation",
      "s3:DeleteObject",
      "s3:ListBucket"
    ]
    resources = [
      module.app_prod_s3.arn,
      "${module.app_prod_s3.arn}/*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "codebuild:BatchGetBuilds",
      "codebuild:StartBuild",
      "codebuild:BatchGetBuildBatches",
      "codebuild:StartBuildBatch"
    ]
    resources = [
      aws_codebuild_project.aws_codebuild_project.arn,
      "${aws_codebuild_project.aws_codebuild_project.arn}/*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogStream"
    ]
    resources = ["*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "secretsmanager:GetSecretValue"
    ]
    resources = [
      aws_secretsmanager_secret.aws_secretsmanager_storyblok_access_token.arn
    ]
  }
}

resource "aws_iam_policy" "aws_iam_policy_codepipeline_execution" {
  name        = "codepipeline-execution-permissions"
  description = "Allow codepipeline to get object from s3, build artifacts and deploy"
  policy      = data.aws_iam_policy_document.aws_iam_policy_document_codepipeline_execution.json
}

resource "aws_iam_role_policy_attachment" "aws_iam_role_policy_attachment_codepipeline" {
  role       = aws_iam_role.aws_iam_role_codepipeline.name
  policy_arn = aws_iam_policy.aws_iam_policy_codepipeline_execution.arn
}

# Create the codepipeline
resource "aws_codepipeline" "aws_codepipeline" {
  name     = "${var.project_name_prefix}-deployment-pipeline"
  role_arn = aws_iam_role.aws_iam_role_codepipeline.arn

  artifact_store {
    location = module.app_source_s3.id
    type     = "S3"
  }

  stage {
    name = "Source"
    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "S3"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        S3Bucket             = module.app_source_s3.id
        S3ObjectKey          = "app-source.zip"
        PollForSourceChanges = false
      }
    }
  }

  stage {
    name = "Build"
    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]

      configuration = {
        ProjectName = aws_codebuild_project.aws_codebuild_project.name
      }
    }
  }

  stage {
    name = "Deploy"
    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "S3"
      version         = "1"
      input_artifacts = ["build_output"]

      configuration = {
        BucketName = module.app_prod_s3.id
        Extract    = true
      }
    }
  }
}

# Create the webhook to allow storyblok to trigger the pipeline
resource "aws_codepipeline_webhook" "aws_codepipeline_webhook" {
  name            = "${var.project_name_prefix}-storyblok-pipeline-webhook"
  authentication  = "UNAUTHENTICATED"
  target_action   = "Source"
  target_pipeline = aws_codepipeline.aws_codepipeline.name

  # Just ensures the request is actually coming from our Storyblok space
  filter {
    json_path    = "$.space_id"
    match_equals = var.storyblok_space_id
  }
}
