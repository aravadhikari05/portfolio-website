terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.92"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
    
  }
  backend "s3" {
    bucket = "aravadhikari-terraform-state"
    key    = "terraform.tfstate"
    region = "us-west-1"
  }

  required_version = ">= 1.2"
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "aws" {
  region = "us-west-1"
}

provider "aws" {
  alias = "us_east_1"
  region = "us-east-1"
}