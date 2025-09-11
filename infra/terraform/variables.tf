# Optional, if you want to parametrize image name or port
variable "image_name" {
  description = "Docker image name"
  default     = "ayeshak2005/ecommerce-website:latest"
}

variable "container_port" {
  description = "Port exposed by container"
  default     = 5000
}
