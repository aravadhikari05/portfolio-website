output "cloudfront_domain" {
  value = aws_cloudfront_distribution.main.domain_name
}

output "cloudfront_id" {
  value = aws_cloudfront_distribution.main.id
}

output "api_url" {
  value = "https://api.${var.domain_name}/visits"
}

output "s3_bucket" {
  value = aws_s3_bucket.root.bucket
}

output "lambda_function" {
  value = aws_lambda_function.visit_count.function_name
}

output "dynamodb_table" {
  value = aws_dynamodb_table.visit_count.name
}