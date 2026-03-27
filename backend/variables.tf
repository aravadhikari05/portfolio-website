variable "domain_name" {
  default = "aravadhikari.com"
}

variable "www_domain_name" {
  default = "www.aravadhikari.com"
}

variable "logs_domain_name" {
  default = "logs.aravadhikari.com"
}

variable "project" {
  default = "aravadhikari"
}

variable "aws_region" {
  default = "us-west-1"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  sensitive = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for aravadhikari.com"
  sensitive = true
}

variable "api_gateway_domain" {
  description = "API Gateway custom domain name"
  default = "d-0yoij42v27.execute-api.us-west-1.amazonaws.com"
}

variable "acm_certificate_arn" {
  description = "ARN of the ACM certificate in us-east-1"
  default = null
}

variable "acm_certificate_arn_regional" {
  description = "ARN of the ACM certificate in us-west-1 for API Gateway"
  default = null
}