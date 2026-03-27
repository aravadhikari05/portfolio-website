resource "aws_cloudfront_distribution" "main" {
  enabled = true
  default_root_object = "index.html"
  aliases = [var.domain_name, var.www_domain_name]
  is_ipv6_enabled = true

  origin {
    domain_name = aws_s3_bucket_website_configuration.root.website_endpoint
    origin_id = "S3-${var.domain_name}"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = "S3-${var.domain_name}"
    viewer_protocol_policy = "redirect-to-https"
    compress = true

    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cloudfront.arn
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  logging_config {
    bucket = aws_s3_bucket.logs.bucket_domain_name
    prefix = "cdn/"
    include_cookies = false
  }

  custom_error_response {
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  tags = {
    Project = var.project
  }
}