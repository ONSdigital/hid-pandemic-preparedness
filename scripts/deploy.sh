#!/bin/bash
# set -e

# Run like this e.g `source ./scripts/deploy.sh storybook-static/ hid-ppt-storybook-dev`

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Required input arguments not set"
    echo "Usage: $0 <local-folder> <s3-bucket-name>"
    return
fi

LOCAL_FOLDER="$1"
BUCKET_NAME="$2"
BUCKET_ORIGIN="${BUCKET_NAME}.s3.eu-west-2.amazonaws.com"
INVALIDATION_BATCH_SIZE=1000

echo "Deploying local folder '$LOCAL_FOLDER' to S3 bucket '$BUCKET_NAME'..."

# Sync the local folder contents to the s3 bucket
SYNC_OUTPUT=$(aws s3 sync "$LOCAL_FOLDER" "s3://$BUCKET_NAME" --delete --output text --dryrun)

# Extract any updated files from the sync output
UPDATED_FILES=$(grep -o "s3://${BUCKET_NAME}[^ ]*" <<< $SYNC_OUTPUT)

# If any files have been updated, create the invalidation to refresh the cloudfront cache
if [ -n "$UPDATED_FILES" ]; then
    INVALIDATION_PATHS=$(sed "s|s3://${BUCKET_NAME}||g" <<< $UPDATED_FILES)
    INVALIDATION_PATHS_ARRAY=(`echo ${INVALIDATION_PATHS}`)

    TOTAL=${#INVALIDATION_PATHS_ARRAY[@]}
    echo "Creating invalidation(s) for $TOTAL updated files..."

    # Find the cloudfront distribution id for this deployment
    DISTRIBUTION_ID=$(aws cloudfront list-distributions \
        --query "DistributionList.Items[?Origins.Items[0].DomainName=='$BUCKET_ORIGIN'].Id" \
        --output text)

    # CloudFront invalidation supports max 1000 paths per request
    # Split CHANGED_PATHS into batches of 1000 if needed
    for (( i=0;  i < ${#INVALIDATION_PATHS_ARRAY[@]};  i += $INVALIDATION_BATCH_SIZE ))
    do
        # Create invalidations for each batch
        BATCH=( "${INVALIDATION_PATHS_ARRAY[@]:$i:$INVALIDATION_BATCH_SIZE}" )
        aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "${BATCH[@]}" --output text
    done
else
  echo "No changes detected. Skipping CloudFront invalidation."
fi

echo "Deployment and invalidation complete."
return
