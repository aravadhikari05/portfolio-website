data "cloudflare_zone" "main" {
  zone_id = var.cloudflare_zone_id
}

resource "cloudflare_dns_record" "root" {
  zone_id = var.cloudflare_zone_id
  name = "@"
  content = aws_cloudfront_distribution.main.domain_name
  type = "CNAME"
  proxied = false
  ttl = 1
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.cloudflare_zone_id
  name = "www"
  content = aws_cloudfront_distribution.main.domain_name
  type = "CNAME"
  proxied = false
  ttl = 1
}

resource "cloudflare_dns_record" "api" {
  zone_id = var.cloudflare_zone_id
  name = "api"
  content = var.api_gateway_domain
  type = "CNAME"
  proxied = false
  ttl = 1
}

resource "cloudflare_dns_record" "acm_validation" {
  zone_id = var.cloudflare_zone_id
  name = "_1e08a55163b05247a68d96359a11e2dd"
  content = "_46d5328a590516cb09485a03880061ad.jkddzztszm.acm-validations.aws"
  type = "CNAME"
  proxied = false
  ttl = 1
}

resource "cloudflare_dns_record" "mx1" {
  zone_id = var.cloudflare_zone_id
  name = "@"
  content = "fwd1.porkbun.com"
  type = "MX"
  proxied = false
  ttl = 1
  priority = 10
}

resource "cloudflare_dns_record" "mx2" {
  zone_id = var.cloudflare_zone_id
  name = "@"
  content = "fwd2.porkbun.com"
  type = "MX"
  proxied = false
  ttl = 1
  priority = 20
}

resource "cloudflare_dns_record" "spf" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  content = "\"v=spf1 include:_spf.porkbun.com ~all\""
  type    = "TXT"
  proxied = false
  ttl     = 1
}