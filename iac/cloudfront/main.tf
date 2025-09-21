locals {
  s3_origin_id = "${var.bucket_name}-s3-origin"
}

resource "aws_cloudfront_origin_access_control" "aws_cloudfront_origin_access_control" {
  name                              = "${var.bucket_name}-cloudfront-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "aws_cloudfront_distribution" {
  origin {
    domain_name              = var.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.aws_cloudfront_origin_access_control.id
    origin_id                = local.s3_origin_id
  }

  enabled             = var.distribution_enabled
  comment             = var.distribution_name
  default_root_object = var.default_root_object

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    dynamic "function_association" {
      for_each = var.function_association
      content {
        event_type   = function_association.value.event_type
        function_arn = function_association.value.function_arn
      }
    }
  }

  price_class = var.price_class

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["GB"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Attach new policy to bucket to allow cloudfront to access
data "aws_iam_policy_document" "aws_iam_policy_document" {
  statement {
    sid    = "AllowCloudFrontServicePrincipal"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject"
    ]
    resources = [
      "arn:aws:s3:::${var.bucket_name}/*"
    ]

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = [aws_cloudfront_distribution.aws_cloudfront_distribution.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "aws_s3_bucket_policy" {
  bucket = var.bucket_name
  policy = data.aws_iam_policy_document.aws_iam_policy_document.json
}
