resource "aws_apigatewayv2_api" "main" {
  name = "aravadhikari-visitcount-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://aravadhikari.com"]
    allow_methods = ["POST"]
    allow_headers = ["Content-Type"]
  }

  tags = {
    Project = var.project
  }
}

resource "aws_apigatewayv2_integration" "visit_count" {
  api_id = aws_apigatewayv2_api.main.id
  integration_type = "AWS_PROXY"
  integration_uri = aws_lambda_function.visit_count.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "visit_count" {
  api_id = aws_apigatewayv2_api.main.id
  route_key = "POST /visits"
  target = "integrations/${aws_apigatewayv2_integration.visit_count.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.main.id
  name = "$default"
  auto_deploy = true

  tags = {
    Project = var.project
  }
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id = "AllowAPIGatewayInvoke"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visit_count.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.main.execution_arn}/*/*"
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = "api.${var.domain_name}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.regional.arn
    endpoint_type = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  tags = {
    Project = var.project
  }
}

resource "aws_apigatewayv2_api_mapping" "api" {
  api_id = aws_apigatewayv2_api.main.id
  domain_name = aws_apigatewayv2_domain_name.api.id
  stage = aws_apigatewayv2_stage.default.id
}