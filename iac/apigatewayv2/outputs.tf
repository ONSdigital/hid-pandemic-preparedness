output "api_endpoint" {
  description = "URI of the API, of the form `https://{api-id}.execute-api.{region}.amazonaws.com` for HTTP APIs."
  value       = aws_apigatewayv2_api.aws_apigatewayv2_api.api_endpoint
}

output "domain_name_id" {
  description = "Domain name identifier."
  value       = (var.domain_name != "" && var.certificate_arn != "") ? aws_apigatewayv2_domain_name.aws_apigatewayv2_domain_name[0].id : null
}