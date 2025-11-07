variable "project_name_prefix" {
  description = "The prefix we use whenever we're naming resources to ensure a unique name"
  default     = "hid-ppt"
  type        = string
}

variable "region" {
  description = "Default region where resources are created"
  default     = "eu-west-2"
  type        = string
}

variable "storyblok_space_id" {
  description = "Storyblok space id used when creating codepipeline webhook url"
  type        = number
}
