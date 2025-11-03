#!/bin/bash
# set -e

# Script zips source files and uses `aws s3 cp` to copy to an s3 bucket.
# Run like this e.g `source ./scripts/cpSourceZip.sh`

BUCKET_NAME="hid-ppt-app-source"
ZIP_FILENAME="app-source.zip"
ZIP_IGNORE_DIRS=(".git/**" ".github/**" ".storybook/**" "dist/**" "doc/**" "iac/**" "node_modules/**" "src/styles/bootstrap-5.3.8/node_modules/**")

# Zip up the source files
echo "Creating '$ZIP_FILENAME' zip archive..."
zip -r "$ZIP_FILENAME" . -x "${ZIP_IGNORE_DIRS[@]}"

# Sync with s3 bucket
echo "Copying '$ZIP_FILENAME' zip archive to '$BUCKET_NAME' s3 bucket..."
aws s3 cp "./$ZIP_FILENAME" "s3://$BUCKET_NAME/$ZIP_FILENAME" --output text