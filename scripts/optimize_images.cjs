const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../client/public/images');

async function convertImages() {
  if (!fs.existsSync(imagesDir)) {
    console.log('Images directory not found');
    return;
  }

  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const filePath = path.join(imagesDir, file);
      const fileName = path.parse(file).name;
      const webpPath = path.join(imagesDir, `${fileName}.webp`);

      // Skip if webp already exists
      if (fs.existsSync(webpPath)) {
        console.log(`Skipping ${file}, webp already exists.`);
        continue;
      }

      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        console.log(`Converted ${file} to ${fileName}.webp`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convertImages();
