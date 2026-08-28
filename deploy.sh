#!/bin/bash
set -e  # stop the script immediately if any command fails

# Load the distribution ID from .env (not committed to git)
source .env

echo "Building React app..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://shelby-portfolio --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths "/*"

echo "Done! Changes should be live within a minute or two."
