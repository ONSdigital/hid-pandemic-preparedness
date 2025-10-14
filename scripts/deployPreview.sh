#!/bin/bash
# set -e

# Script uses `aws s3 sync` to sync built asset files to an s3 bucket. It then zips up the astro
# ssr dist folder and deploys it to the lambda.
# Run like this e.g `source ./scripts/deployPreview.sh`

BUCKET_NAME="hid-ppt-app-preview"
BUILD_FOLDER="dist"
LAMBDA_FOLDER="lambda"
LAMBDA_FUNCTION_NAME="hid-ppt-lambda-storyblok-preview"
ZIP_FILENAME="astro-ssr-lambda.zip"

# Copy required files from lambda folder to build folder. Trims leading slashes
echo "Copying required files from '$LAMBDA_FOLDER' to '$BUILD_FOLDER'..."
cp -r $LAMBDA_FOLDER/* $BUILD_FOLDER

echo "Running npm install in '$BUILD_FOLDER' to include external dependencies..."
( cd $BUILD_FOLDER && npm ci )

echo "Syncing local folder '$LOCAL_FOLDER' to S3 bucket '$BUCKET_NAME'..."

# Sync the local folder contents to the s3 bucket
aws s3 sync "$BUILD_FOLDER/client" "s3://$BUCKET_NAME" --delete --output text

# Zip folder
echo "Creating '$ZIP_FILENAME' zip archive..."
( cd $BUILD_FOLDER && zip -r ../$ZIP_FILENAME * )

zip -r $ZIP_FILENAME $BUILD_FOLDER

# Push to lambda
echo "Pushing '$ZIP_FILENAME' zip archive to '$LAMBDA_FUNCTION_NAME' lambda function..."
aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --zip-file fileb://$ZIP_FILENAME --publish --output text

echo "Preview site deployment complete. Updated site is available at $PREVIEW_CDN_BASE_URL"
