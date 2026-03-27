resource "aws_iam_role" "lambda_exec" {
  name = "aravadhikari-visitcount-function-role-51gi1758"
  path = "/service-role/"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Project = var.project
  }
}

resource "aws_iam_role_policy" "lambda_dynamodb" {
  name = "aravadhikari-visitcount-policy"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:UpdateItem"
        ]
        Resource = aws_dynamodb_table.visit_count.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::516292808488:policy/service-role/AWSLambdaBasicExecutionRole-1550776b-7379-47aa-afe0-0d22d873b71a"
}