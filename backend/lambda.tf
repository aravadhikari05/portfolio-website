data "archive_file" "visit_count" {
  type = "zip"
  source_dir = "${path.module}/lambda/visit_count"
  output_path = "${path.module}/lambda/visit_count.zip"
}

resource "aws_lambda_function" "visit_count" {
  filename = data.archive_file.visit_count.output_path
  function_name = "aravadhikari-visitcount-function"
  role = aws_iam_role.lambda_exec.arn
  handler = "update_count.handler"
  runtime = "python3.13"
  architectures = ["arm64"]
  source_code_hash = data.archive_file.visit_count.output_base64sha256

  tags = {
    Project = var.project
  }
}