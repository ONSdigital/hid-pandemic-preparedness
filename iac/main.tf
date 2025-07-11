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
  source      = "./s3"
  bucket_name = "${var.bucket_name_prefix}-storybook-dev"
  configure_for_site_hosting = true
  force_destroy = true
}

# Create bucket for storybook main site hosting
module "storybook_main" {
  source      = "./s3"
  bucket_name = "${var.bucket_name_prefix}-storybook-main"
  configure_for_site_hosting = true
  force_destroy = true
}