# Output the api gateway invoke url
output "api_gateway_invoke_url" {
  value       = aws_apigatewayv2_api.aws_apigatewayv2_api.api_endpoint
  description = "Invoke URL for the API Gateway HTTP API"
}