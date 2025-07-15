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

# Create bucket for storybook dev site hosting
module "storybook_dev" {
  source                     = "./s3"
  bucket_name                = "${var.bucket_name_prefix}-storybook-dev"
  configure_for_site_hosting = true
  force_destroy              = true
}

# Create bucket for storybook main site hosting
module "storybook_main" {
  source                     = "./s3"
  bucket_name                = "${var.bucket_name_prefix}-storybook-main"
  configure_for_site_hosting = true
  force_destroy              = true
}


# Create iam user for automated deployments via github actions
resource "aws_iam_user" "aws_iam_user" {
  name = "github-actions"
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
      "arn:aws:s3:::${module.storybook_main.id}",
      "arn:aws:s3:::${module.storybook_main.id}/*"
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
