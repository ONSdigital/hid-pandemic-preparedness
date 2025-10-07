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
  bucket_name                 = module.app_main_s3.id
  bucket_regional_domain_name = module.app_main_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Main app"
  function_association = [{
    event_type   = "viewer-request"
    function_arn = aws_cloudfront_function.aws_cloudfront_function.arn
  }]
  price_class = "PriceClass_All"
  geo_restriction = [{
    restriction_type = "none"
    locations        = []
  }]
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
}

# IAM role for Lambda execution
data "aws_iam_policy_document" "aws_iam_policy_document_lambda" {
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
  assume_role_policy = data.aws_iam_policy_document.aws_iam_policy_document_lambda.json
}

# Package the Lambda function code
data "archive_file" "astro_ssr_deployment_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/"
  output_path = "${path.module}/../astro-ssr-lambda.zip"
}

# Lambda function for CMS preview deployment
resource "aws_lambda_function" "aws_lambda_function" {
  filename         = data.archive_file.astro_ssr_deployment_zip.output_path
  function_name    = "${var.project_name_prefix}-lambda-storyblok-preview"
  role             = aws_iam_role.aws_iam_role_lambda.arn
  handler          = "handler.handler"
  source_code_hash = data.archive_file.astro_ssr_deployment_zip.output_base64sha256

  runtime = "nodejs22.x"
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
  integration_uri    = aws_lambda_function.aws_lambda_function.invoke_arn
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

# Permission for API Gateway to invoke Lambda
resource "aws_lambda_permission" "aws_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.aws_lambda_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.aws_apigatewayv2_api.execution_arn}/*/*"
}

# Output the api gateway invoke url
output "api_gateway_invoke_url" {
  value       = aws_apigatewayv2_api.aws_apigatewayv2_api.api_endpoint
  description = "Invoke URL for the API Gateway HTTP API"
}

# Attach cors policy to preview s3 bucket so assets can be requested from the deployed site
resource "aws_s3_bucket_cors_configuration" "aws_s3_bucket_cors_configuration" {
  bucket = module.app_preview_s3.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = [aws_apigatewayv2_api.aws_apigatewayv2_api.api_endpoint]
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
      "arn:aws:s3:::${module.storybook_main_s3.id}",
      "arn:aws:s3:::${module.storybook_main_s3.id}/*",
      "arn:aws:s3:::${module.app_main_s3.id}",
      "arn:aws:s3:::${module.app_main_s3.id}/*"
    ]
  }
}

resource "aws_iam_policy" "aws_iam_policy" {
  name        = "github-actions-s3-access"
  description = "Allow S3 access to specific bucket"
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
