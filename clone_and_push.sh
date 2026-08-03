#!/bin/bash
set -e
echo "Cloning website..."
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent https://obscurastudio.webflow.io/
echo "Moving files..."
mv obscurastudio.webflow.io/* . || true
rm -rf obscurastudio.webflow.io
echo "Initializing git repository..."
git init
git add .
git commit -m "step 1: exact clone of obscurastudio.webflow.io"
git branch -M main
git remote add origin https://github.com/A-P-S-Bhaidav/EAD-LSM-website.git || true
echo "Pushing to remote..."
git push -u origin main
