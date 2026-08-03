const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(path.join(__dirname, '../.env'));

const db = require('../src/utils/db');

const uploadPresetsToRailway = async () => {
  try {
    const presets = await db.any('SELECT id, lut_path FROM presets');
    console.log(`Found ${presets.length} presets`);

    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    for (const preset of presets) {
      const localPath = preset.lut_path.replace(/\\/g, '/');
      const fileName = path.basename(localPath);
      const railwayPath = path.join(uploadsDir, fileName);

      if (fs.existsSync(localPath)) {
        fs.copyFileSync(localPath, railwayPath);
        await db.none('UPDATE presets SET lut_path = $1 WHERE id = $2', [railwayPath, preset.id]);
        console.log(`✅ Preset ${preset.id}: ${fileName}`);
      } else {
        console.log(`⚠️ Preset ${preset.id}: File not found at ${localPath}`);
      }
    }

    console.log('✅ Done');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

uploadPresetsToRailway();