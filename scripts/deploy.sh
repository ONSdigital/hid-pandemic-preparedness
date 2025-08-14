#!/bin/bash
# set -e

# Script uses `aws s3 sync` to sync built app files to an s3 bucket, and aws cloudfront
# invalidations to clear the cloudfront cache for changed files.
# Run like this e.g `source ./scripts/deploy.sh storybook-static/ hid-ppt-storybook-dev`

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Required input arguments not set"
    echo "Usage: $0 <local-folder> <s3-bucket-name>"
    exit 1
fi

LOCAL_FOLDER="$1"
BUCKET_NAME="$2"
BUCKET_ORIGIN="${BUCKET_NAME}.s3.eu-west-2.amazonaws.com"
MAX_INVALIDATION_BATCH_SIZE=3000

echo "Deploying local folder '$LOCAL_FOLDER' to S3 bucket '$BUCKET_NAME'..."

# Sync the local folder contents to the s3 bucket
SYNC_OUTPUT=$(aws s3 sync "$LOCAL_FOLDER" "s3://$BUCKET_NAME" --delete --output text)

# Extract any updated files from the sync output
UPDATED_FILES=$(grep -o "s3://${BUCKET_NAME}[^ ]*" <<< $SYNC_OUTPUT)

# If any files have been updated, create the invalidation to refresh the cloudfront cache see
# https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html
if [ -n "$UPDATED_FILES" ]; then
    INVALIDATION_PATHS=$(sed "s|s3://${BUCKET_NAME}||g" <<< $UPDATED_FILES)
    INVALIDATION_PATHS_ARRAY=(`echo ${INVALIDATION_PATHS}`)

    TOTAL=${#INVALIDATION_PATHS_ARRAY[@]}
    echo "Creating invalidation(s) for $TOTAL updated files..."

    # Find the cloudfront distribution id for this deployment based on the bucket url
    DISTRIBUTION_ID=$(aws cloudfront list-distributions \
        --query "DistributionList.Items[?Origins.Items[0].DomainName=='$BUCKET_ORIGIN'].Id" \
        --output text)

    # CloudFront invalidation supports max `MAX_INVALIDATION_BATCH_SIZE` file paths per request see
    # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/InvalidationLimits.html
    # Split CHANGED_PATHS into batches of `MAX_INVALIDATION_BATCH_SIZE` if needed
    for (( i=0;  i < ${#INVALIDATION_PATHS_ARRAY[@]};  i += $MAX_INVALIDATION_BATCH_SIZE ))
    do
        # Create invalidations for each batch
        BATCH=( "${INVALIDATION_PATHS_ARRAY[@]:$i:$MAX_INVALIDATION_BATCH_SIZE}" )
        aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "${BATCH[@]}" --output text
    done
else
  echo "No changes detected. Skipping CloudFront invalidation."
fi

# Get the distribution domain name
DISTRIBUTION_DOMAIN_NAME=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Origins.Items[0].DomainName=='$BUCKET_ORIGIN'].DomainName" \
    --output text)

echo "Deployment and invalidation complete. Updated site is available at https://${DISTRIBUTION_DOMAIN_NAME}."
