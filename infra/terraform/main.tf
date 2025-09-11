# Example VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# Example Subnet
resource "aws_subnet" "subnet1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

# Security Group
resource "aws_security_group" "allow_http" {
  vpc_id = aws_vpc.main.id
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 instance
resource "aws_instance" "jenkins" {
  ami           = "<AMI_ID>"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.subnet1.id
  security_groups = [aws_security_group.allow_http.name]
}

