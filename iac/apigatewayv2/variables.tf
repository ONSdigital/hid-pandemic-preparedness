variable "certificate_arn" {
  description = "ARN of an AWS-managed certificate that will be used by the endpoint for the domain name. AWS Certificate Manager is the only supported source."
  type        = string
  default     = ""
}

variable "description" {
  description = "Description of the API. Must be less than or equal to 1024 characters in length."
  type        = string
}

variable "domain_name" {
  description = "Domain name. Must be between 1 and 512 characters in length."
  type        = string
  default     = ""
}

variable "function_name" {
  description = "Name or ARN of the Lambda function associated with this API."
  type        = string
}

variable "integration_uri" {
  description = "URI of the Lambda function for a Lambda proxy integration, when integration_type is AWS_PROXY. For an HTTP integration, specify a fully-qualified URL. For an HTTP API private integration, specify the ARN of an Application Load Balancer listener, Network Load Balancer listener, or AWS Cloud Map service."
  type        = string
}

variable "name" {
  description = "Name of the API. Must be less than or equal to 128 characters in length."
  type        = string
}