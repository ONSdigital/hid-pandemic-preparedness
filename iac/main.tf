terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  backend "s3" {
    bucket = join("-", [var.bucket_name_prefix, "tf-state"])
    key    = "terraform.tfstate"
    region = var.region
  }

  required_version = "~> 1.12.2"
}


resource "aws_s3_bucket" "storybook_dev" {
  bucket        = join("-", [var.bucket_name_prefix, "storybook-dev"])
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "storybook_dev_ownership_controls" {
  bucket = aws_s3_bucket.storybook_dev.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "storybook_dev_public_access_block" {
  bucket = aws_s3_bucket.storybook_dev.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "storybook_dev_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.storybook_dev_ownership_controls,
    aws_s3_bucket_public_access_block.storybook_dev_public_access_block,
  ]

  bucket = aws_s3_bucket.storybook_dev.id
  acl    = "public-read"
}


resource "aws_s3_bucket_website_configuration" "storybook_dev_website_configuration" {
  bucket = aws_s3_bucket.storybook_dev.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}
