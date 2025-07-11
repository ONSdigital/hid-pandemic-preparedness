resource "aws_s3_bucket" "aws_s3_bucket" {
  bucket        = var.bucket_name
  force_destroy = var.force_destroy
}

resource "aws_s3_bucket_ownership_controls" "aws_s3_bucket_ownership_controls" {
  count = var.configure_for_site_hosting ? 1 : 0
  bucket = aws_s3_bucket.aws_s3_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "aws_s3_bucket_public_access_block" {
  count = var.configure_for_site_hosting ? 1 : 0
  bucket = aws_s3_bucket.aws_s3_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "aws_s3_bucket_acl" {
  count = var.configure_for_site_hosting ? 1 : 0
  bucket = aws_s3_bucket.aws_s3_bucket.id

  acl    = "public-read"

  depends_on = [
    aws_s3_bucket_ownership_controls.aws_s3_bucket_ownership_controls,
    aws_s3_bucket_public_access_block.aws_s3_bucket_public_access_block,
  ]
}


resource "aws_s3_bucket_website_configuration" "aws_s3_bucket_website_configuration" {
  count = var.configure_for_site_hosting ? 1 : 0
  bucket = aws_s3_bucket.aws_s3_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}
