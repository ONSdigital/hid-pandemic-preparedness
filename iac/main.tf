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

# Create bucket for storybook dev
module "storybook_dev_s3" {
  source                     = "./s3"
  bucket_name                = "${var.bucket_name_prefix}-storybook-dev"
  configure_for_site_hosting = false
  force_destroy              = true
}

# Set up cloudfront distribution for storybook dev
module "storybook_dev_cloudfront" {
  source                      = "./cloudfront"
  bucket_name                 = module.storybook_dev_s3.id
  bucket_regional_domain_name = module.storybook_dev_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Dev storybook"
}

# Create bucket for storybook main
module "storybook_main_s3" {
  source                     = "./s3"
  bucket_name                = "${var.bucket_name_prefix}-storybook-main"
  configure_for_site_hosting = false
  force_destroy              = true
}

# Set up cloudfront distribution for storybook main
module "storybook_main_cloudfront" {
  source                      = "./cloudfront"
  bucket_name                 = module.storybook_main_s3.id
  bucket_regional_domain_name = module.storybook_main_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Main storybook"
}

# Create bucket for app dev
module "app_dev_s3" {
  source                     = "./s3"
  bucket_name                = "${var.bucket_name_prefix}-app-dev"
  configure_for_site_hosting = true
  force_destroy              = true
}

# Set up cloudfront distribution for app dev
module "app_dev_cloudfront" {
  source                      = "./cloudfront"
  bucket_name                 = module.app_dev_s3.id
  bucket_regional_domain_name = module.app_dev_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Dev app"
}

# Create bucket for app main
module "app_main_s3" {
  source                     = "./s3"
  bucket_name                = "${var.bucket_name_prefix}-app-main"
  configure_for_site_hosting = true
  force_destroy              = true
}

# Set up cloudfront distribution for app main
module "app_main_cloudfront" {
  source                      = "./cloudfront"
  bucket_name                 = module.app_main_s3.id
  bucket_regional_domain_name = module.app_main_s3.bucket_regional_domain_name
  distribution_enabled        = true
  distribution_name           = "Main app"
}

# Create iam user for automated deployments via github actions
resource "aws_iam_user" "aws_iam_user" {
  name          = "github-actions"
  force_destroy = true
}

data "aws_iam_policy_document" "aws_iam_policy_document" {
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
  policy      = data.aws_iam_policy_document.aws_iam_policy_document.json
}

resource "aws_iam_user_policy_attachment" "aws_iam_user_policy_attachment" {
  user       = aws_iam_user.aws_iam_user.name
  policy_arn = aws_iam_policy.aws_iam_policy.arn
}
