# Output the api gateway invoke url
output "api_gateway_invoke_url" {
  value       = aws_apigatewayv2_api.aws_apigatewayv2_api.api_endpoint
  description = "Invoke URL for the API Gateway HTTP API"
}

output "aws_codepipeline_webhook_url" {
  value       = aws_codepipeline_webhook.aws_codepipeline_webhook.url
  description = "The CodePipeline webhook's URL. POST events to this endpoint to trigger the target."
}