#!/bin/bash
set -e

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Required input arguments not set"
    echo "Usage: $0 <local-folder> <s3-bucket-name>"
    return
fi

LOCAL_FOLDER="$1"
BUCKET_NAME="$2"
BUCKET_ORIGIN="${BUCKET_NAME}.s3.eu-west-2.amazonaws.com"

echo "Deploying local folder '$LOCAL_FOLDER' to S3 bucket '$BUCKET_NAME'..."

# Sync the local folder contents to the s3 bucket
SYNC_OUTPUT=$(aws s3 sync "$LOCAL_FOLDER" "s3://$BUCKET_NAME" --delete --output text)

echo "$SYNC_OUTPUT"

# Find the cloudfront distribution id for this deployment
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Origins.Items[0].DomainName=='$BUCKET_ORIGIN'].Id" \
    --output text)

# Create the invalidation for all files to ensure the cloudfront cache is cleared

if echo "$SYNC_OUTPUT" | grep -qE 'upload:|copy:|delete:'; then
  echo "Changes detected. Creating CloudFront invalidation..."

  INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

  echo "Invalidation created with ID: $INVALIDATION_ID"
else
  echo "No changes detected. Skipping CloudFront invalidation."
fi
