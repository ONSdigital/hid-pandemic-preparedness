output "app_preview_api_gateway_invoke_url" {
  value       = module.app_preview_api_gateway.api_endpoint
  description = "Invoke URL for the App Preview API Gateway HTTP API"
}

output "aws_codepipeline_webhook_url" {
  value       = aws_codepipeline_webhook.aws_codepipeline_webhook.url
  description = "The CodePipeline webhook's URL. POST events to this endpoint to trigger the target."
}

# Output the api gateway invoke url
output "environment_auth_api_gateway_invoke_url" {
  value       = module.environment_auth_api_gateway.api_endpoint
  description = "Invoke URL for the environment auth API Gateway HTTP API"
}
