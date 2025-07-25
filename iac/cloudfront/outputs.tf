output "arn" {
  description = "ARN for the distribution."
  value       = aws_cloudfront_distribution.aws_cloudfront_distribution.arn
}

output "domain_name" {
  description = "Domain name corresponding to the distribution."
  value       = aws_cloudfront_distribution.aws_cloudfront_distribution.domain_name
}