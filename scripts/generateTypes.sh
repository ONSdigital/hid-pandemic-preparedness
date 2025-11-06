#!/bin/bash
# set -e

# Script uses Storyblok CLI to generate types from bloks used in the Storyblok space and then
# copies them to the correct location in our repository.
# Run like this e.g `source ./scripts/generateTypes.sh`

SOURCE_TYPES_DIR="src/types"
STORYBLOK_TYPES_DIR=".storyblok/types"


npm run sb:components-pull
npm run sb:types-generate

# Copy the generated files into our source folder
cp ${STORYBLOK_TYPES_DIR}/*.d.ts $SOURCE_TYPES_DIR
cp ${STORYBLOK_TYPES_DIR}/${STORYBLOK_SPACE_ID}/*.d.ts ${SOURCE_TYPES_DIR}/bloks
