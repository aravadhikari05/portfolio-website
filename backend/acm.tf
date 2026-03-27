resource "aws_acm_certificate" "cloudfront" {
  provider = aws.us_east_1
  domain_name = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method = "DNS"

  tags = {
    Project = var.project
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "regional" {
  domain_name = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method = "DNS"

  tags = {
    Project = var.project
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cloudfront" {
  provider = aws.us_east_1
  certificate_arn = aws_acm_certificate.cloudfront.arn
}

resource "aws_acm_certificate_validation" "regional" {
  certificate_arn = aws_acm_certificate.regional.arn
}