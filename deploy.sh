#!/usr/bin/env bash
# Manual deploy fallback. CI (.github/workflows/deploy.yml) is the primary path.
set -euo pipefail

cd "$(dirname "$0")"

# .env holds CLOUDFRONT_DISTRIBUTION_ID and is not committed.
if [ ! -f .env ]; then
  echo "Missing .env with CLOUDFRONT_DISTRIBUTION_ID. See README." >&2
  exit 1
fi
# shellcheck disable=SC1091
source .env
: "${CLOUDFRONT_DISTRIBUTION_ID:?CLOUDFRONT_DISTRIBUTION_ID is not set in .env}"

echo "Building React app..."
npm run build

# Keep in sync with .github/workflows/deploy.yml.
echo "Uploading hashed assets to S3..."
aws s3 sync dist/ s3://shelby-portfolio --delete \
  --exclude "*" --include "assets/*" \
  --cache-control "public,max-age=31536000,immutable"

echo "Uploading remaining files to S3..."
aws s3 sync dist/ s3://shelby-portfolio --delete \
  --exclude "assets/*" \
  --cache-control "public,max-age=0,must-revalidate"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths "/*"

echo "Done! Changes should be live within a minute or two."
