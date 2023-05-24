#!/bin/sh

echo "Clean up BE...START"
./node_modules/.bin/lb-clean dist *.tsbuildinfo .eslintcache

rm -rf  artifact.zip

echo "Clean up BE...DONE"
