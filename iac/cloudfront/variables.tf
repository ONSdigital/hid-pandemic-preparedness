variable "acm_certificate_arn" {
  description = "ARN of the AWS Certificate Manager certificate that you wish to use with this distribution."
  type        = string
  default     = null
}

variable "bucket_name" {
  description = "The name of the bucket we're using as the origin of the cloudfront distribution."
  type        = string
}

variable "bucket_regional_domain_name" {
  description = "DNS domain name of the S3 bucket."
  type        = string
}

variable "default_root_object" {
  description = "Object that you want CloudFront to return (for example, index.html) when an end user requests the root URL"
  type        = string
  default     = null
}

variable "distribution_enabled" {
  description = "Whether the distribution is enabled to accept end user requests for content."
  type        = bool
}

variable "distribution_name" {
  description = "The name of the distribution to show on the AWS console."
  type        = string
}

variable "function_association" {
  description = "With CloudFront Functions in Amazon CloudFront, you can write lightweight functions in JavaScript for high-scale, latency-sensitive CDN customizations. You can associate a single function per event type."
  type = list(object({
    event_type   = string
    function_arn = string
  }))
  default = []
}

variable "geo_restriction" {
  description = "The restrictions sub-resource takes another single sub-resource named geo_restriction."
  type = list(object({
    restriction_type = string       # Method that you want to use to restrict distribution of your content by country: `none`, `whitelist`, or `blacklist`.
    locations        = list(string) # ISO 3166-1-alpha-2 codes for which you want CloudFront either to distribute your content (whitelist) or not distribute your content (blacklist). If the type is specified as `none` an empty array can be used.
  }))
  default = [
    {
      restriction_type = "whitelist"
      locations        = ["GB"]
    }
  ]
}

variable "long_cache_path_pattern" {
  description = "Pattern (for example, images/*.jpg) that specifies which requests you want a long cache behavior to apply to."
  type        = string
}


variable "price_class" {
  description = "Price class for this distribution. See https://aws.amazon.com/cloudfront/features/?icmpid=docs_console_unmapped#Global_Edge_Network"
  type        = string
  default     = "PriceClass_100"
}


variable "viewer_certificate" {
  description = "The SSL configuration for this distribution (maximum one)."
  type = object({
    acm_certificate_arn            = optional(string)
    cloudfront_default_certificate = optional(bool, false)
    minimum_protocol_version       = optional(string)
    ssl_support_method             = optional(string)
  })
}
