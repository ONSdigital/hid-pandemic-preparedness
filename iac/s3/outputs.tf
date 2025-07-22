output "bucket_regional_domain_name" {
  description = "Bucket domain name."
  value       = aws_s3_bucket.aws_s3_bucket.bucket_regional_domain_name
}

output "id" {
  description = "The name of the S3 bucket"
  value       = aws_s3_bucket.aws_s3_bucket.id
}