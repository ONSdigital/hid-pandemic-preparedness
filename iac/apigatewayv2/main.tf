# Api gateway setup for lambda deployment
resource "aws_apigatewayv2_api" "aws_apigatewayv2_api" {
  name          = var.name
  description   = var.description
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "aws_apigatewayv2_integration" {
  api_id             = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  integration_type   = "AWS_PROXY"
  description        = "Integration to invoke '${var.function_name}' Lambda function"
  integration_method = "POST"
  integration_uri    = var.integration_uri
}

resource "aws_apigatewayv2_route" "aws_apigatewayv2_route" {
  api_id    = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.aws_apigatewayv2_integration.id}"
}

resource "aws_apigatewayv2_route" "aws_apigatewayv2_route_2" {
  api_id    = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  route_key = "ANY /"
  target    = "integrations/${aws_apigatewayv2_integration.aws_apigatewayv2_integration.id}"
}

resource "aws_apigatewayv2_stage" "aws_apigatewayv2_stage" {
  api_id      = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_domain_name" "aws_apigatewayv2_domain_name" {
  domain_name = var.domain_name

  domain_name_configuration {
    certificate_arn = var.certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "aws_apigatewayv2_api_mapping" {
  api_id      = aws_apigatewayv2_api.aws_apigatewayv2_api.id
  domain_name = aws_apigatewayv2_domain_name.aws_apigatewayv2_domain_name.id
  stage       = aws_apigatewayv2_stage.aws_apigatewayv2_stage.id
}

# Permission for API Gateway to invoke Lambda
resource "aws_lambda_permission" "aws_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.aws_apigatewayv2_api.execution_arn}/*/*"
}