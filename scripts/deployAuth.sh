#!/bin/bash
# set -e

# Script zips up the auth node.js handler as a package and deploys it to the lambda.
# Run like this e.g `source ./scripts/deployAuth.sh`

LAMBDA_FOLDER="lambda/auth"
LAMBDA_FUNCTION_NAME="hid-ppt-lambda-environment-auth"
ZIP_FILENAME="auth-lambda.zip"

echo "Running npm install in '$LAMBDA_FOLDER' to include external dependencies..."
( cd $LAMBDA_FOLDER && npm ci )

# Zip folder
echo "Creating '$ZIP_FILENAME' zip archive..."
( cd $LAMBDA_FOLDER && zip -r ../../$ZIP_FILENAME . )

# Push to lambda
echo "Pushing '$ZIP_FILENAME' zip archive to '$LAMBDA_FUNCTION_NAME' lambda function..."
aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --zip-file fileb://$ZIP_FILENAME --publish --output text
