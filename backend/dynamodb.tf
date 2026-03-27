resource "aws_dynamodb_table" "visit_count" {
  name = "aravadhikari-visitcount-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Project = var.project
  }
}