#!/bin/bash
# Script to move files into Quartz's expected content structure

set -e

# Ensure content and subfolders exist
mkdir -p content/files
mkdir -p content/images
mkdir -p content/writeups

echo "📂 Moving Markdown files..."
# Move RawMarkdown and docs markdown into content root
if [ -d "RawMarkdown" ]; then
  mv RawMarkdown/*.md content/ || true
  rm -rf RawMarkdown
fi

# Move any top-level markdown from docs (ignoring config/tutorials)
for file in docs/*.md; do
  if [ -f "$file" ]; then
    mv "$file" content/
  fi
done

echo "📂 Moving PDFs and other files..."
# Move PDFs and zip files into content/files
find docs -maxdepth 1 -type f \( -name "*.pdf" -o -name "*.zip" \) -exec mv {} content/files/ \;

echo "📂 Moving writeups..."
# Specific writeups go to writeups
if [ -f "docs/GHomeSmartPlugWriteup.pdf" ]; then
  mv docs/GHomeSmartPlugWriteup.pdf content/writeups/
fi
if [ -f "docs/MalvertizerWriteup.pdf" ]; then
  mv docs/MalvertizerWriteup.pdf content/writeups/
fi

echo "📂 Moving images..."
# Move images folder into content
if [ -d "docs/images" ]; then
  mv docs/images content/images/
fi

echo "🧹 Cleaning up old docs folder..."
# Keep docs only if it still has Quartz-related config
rm -rf docs/* || true

echo "✅ Done! Your new structure under content/ is ready."
