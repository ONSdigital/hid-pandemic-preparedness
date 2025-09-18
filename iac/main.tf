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
  bucket_name                = "${var.bucket_name_prefix}-storybook-dev"
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
  bucket_name                = "${var.bucket_name_prefix}-storybook-main"
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
  bucket_name                = "${var.bucket_name_prefix}-app-dev"
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
  bucket_name                = "${var.bucket_name_prefix}-app-main"
  configure_for_site_hosting = true
  force_destroy              = true
}

# Set up cloudfront distribution for app main
# Function association is enabled to enable astro static site folder based navigation
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
