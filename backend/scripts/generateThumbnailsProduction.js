const dotenv = require('dotenv');
const path = require('path');
dotenv.config(path.join(__dirname, '../.env'));

const sharp = require('sharp');
const fs = require('fs');
const db = require('../src/utils/db');
const lutService = require('../src/services/lutService');

const generateThumbnails = async () => {
  try {
    const presets = await db.any('SELECT * FROM presets WHERE thumbnail_url LIKE $1', ['%preset_%']);
    console.log(`Found ${presets.length} presets`);

    const thumbnailPath = path.join(__dirname, '../uploads/thumbnails');
    if (!fs.existsSync(thumbnailPath)) {
      fs.mkdirSync(thumbnailPath, { recursive: true });
    }

    // Create temp sample image
    const tempSamplePath = path.join(__dirname, '../uploads/sample_temp.jpg');
    await sharp({
      create: {
        width: 200,
        height: 200,
        channels: 3,
        background: { r: 128, g: 100, b: 80 }
      }
    }).jpeg().toFile(tempSamplePath);

    for (const preset of presets) {
      try {
        const lutData = await lutService.loadCubeLUT(preset.lut_path);
        const processed = await lutService.applyLUT(tempSamplePath, lutData);

        const fileName = `preset_${preset.id}.jpg`;
        const filePath = path.join(thumbnailPath, fileName);

        await processed.jpeg({ quality: 85 }).toFile(filePath);
        console.log(`✅ Preset ${preset.id}`);
      } catch (error) {
        console.error(`❌ Preset ${preset.id}:`, error.message);
      }
    }

    fs.unlinkSync(tempSamplePath);
    console.log('✅ Done');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

generateThumbnails();