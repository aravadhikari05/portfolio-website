resource "aws_s3_bucket" "root" {
  bucket = var.domain_name

  tags = {
    Project = var.project
  }
}

resource "aws_s3_bucket" "www" {
  bucket = var.www_domain_name

  tags = {
    Project = var.project
  }
}

resource "aws_s3_bucket" "logs" {
  bucket = var.logs_domain_name

  tags = {
    Project = var.project
  }
}

resource "aws_s3_bucket_website_configuration" "root" {
  bucket = aws_s3_bucket.root.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_website_configuration" "www" {
  bucket = aws_s3_bucket.www.id

  redirect_all_requests_to {
    host_name = var.domain_name
    protocol  = "https"
  }
}

resource "aws_s3_bucket_public_access_block" "root" {
  bucket = aws_s3_bucket.root.id

  block_public_acls = false
  block_public_policy = false
  ignore_public_acls = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "root" {
  bucket = aws_s3_bucket.root.id
  depends_on = [aws_s3_bucket_public_access_block.root]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadGetObject"
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.root.arn}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_logging" "root" {
  bucket = aws_s3_bucket.root.id

  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "logs/"
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "logs" {
  depends_on = [aws_s3_bucket_ownership_controls.logs]
  bucket = aws_s3_bucket.logs.id
  acl = "log-delivery-write"
}