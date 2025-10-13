output "arn" {
  description = "ARN of the bucket."
  value       = aws_s3_bucket.aws_s3_bucket.arn
}

output "bucket_regional_domain_name" {
  description = "Bucket domain name."
  value       = aws_s3_bucket.aws_s3_bucket.bucket_regional_domain_name
}

output "id" {
  description = "Name of the bucket."
  value       = aws_s3_bucket.aws_s3_bucket.id
}