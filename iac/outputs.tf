# Output the api gateway invoke url
output "api_gateway_invoke_url" {
  value       = aws_apigatewayv2_api.aws_apigatewayv2_api.api_endpoint
  description = "Invoke URL for the API Gateway HTTP API"
}

output "aws_codepipeline_webhook_url" {
  value       = aws_codepipeline_webhook.aws_codepipeline_webhook.url
  description = "The CodePipeline webhook's URL. POST events to this endpoint to trigger the target."
}

output "lambda_function_url" {
  value       = aws_lambda_function_url.aws_lambda_function_url.function_url
  description = "HTTP URL endpoint for the function in the format `https://<url_id>.lambda-url.<region>.on.aws/.`"
}