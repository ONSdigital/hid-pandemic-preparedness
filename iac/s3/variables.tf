
variable "bucket_name" {
  description = "The name of the bucket we're creating"
  type        = string
}

variable "configure_for_site_hosting" {
  description = "If set to true the s3 bucket will be configured for static website hosting"
  default     = false
  type        = bool
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#force_destroy-1
variable "force_destroy" {
  description = "If set to true all objects (including any locked objects) should be deleted from the bucket when the bucket is destroyed so that the bucket can be destroyed without error."
  default     = false
  type        = bool
}

variable "versioning_configuration_status" {
  description = "Versioning state of the bucket. Valid values: Enabled, Suspended, or Disabled. Disabled should only be used when creating or importing resources that correspond to unversioned S3 buckets."
  default     = "Disabled"
  type        = string
}