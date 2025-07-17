variable "bucket_name" {
  description = "The name of the bucket we're using as the origin of the cloudfront distribution."
  type        = string
}

variable "bucket_regional_domain_name" {
  description = "DNS domain name of the S3 bucket."
  type        = string
}

variable "distribution_enabled" {
  description = "Whether the distribution is enabled to accept end user requests for content."
  type        = bool
}
