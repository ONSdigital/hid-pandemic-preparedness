#!/bin/bash
# set -e

# Script zips source files and uses `aws s3 cp` to copy to an s3 bucket.
# Run like this e.g `source ./scripts/cpSourceZip.sh hid-ppt-app-source`

if [ -z "$1" ]; then
    echo "Required input arguments not set"
    echo "Usage: $0 <s3-bucket-name>"
    exit 1
fi

BUCKET_NAME="$1"
ZIP_FILENAME="app-source.zip"
ZIP_IGNORE_DIRS=(".git/**" ".github/**" ".storybook/**" "dist/**" "doc/**" "iac/**" "node_modules/**")

# Zip up the source files
echo "Creating '$ZIP_FILENAME' zip archive..."
zip -r "$ZIP_FILENAME" . -x "${ZIP_IGNORE_DIRS[@]}"

# Sync with s3 bucket
echo "Copying '$ZIP_FILENAME' zip archive to '$BUCKET_NAME' s3 bucket..."
aws s3 cp "./$ZIP_FILENAME" "s3://$BUCKET_NAME/$ZIP_FILENAME" --output text