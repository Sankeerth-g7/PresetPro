const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

const PRESET_DIR = process.argv[2] || './presets';
const API_URL = 'http://localhost:5000/api/presets/upload';

const getCategory = (folderName) => {
  if (folderName.includes('Indian skin tone')) return 'Portrait - Indian Skin Tone';
  if (folderName.includes('LOG LUT')) return 'LOG LUT';
  return 'Other';
};

const uploadPresets = async () => {
  try {
    const folders = fs.readdirSync(PRESET_DIR).filter(f => 
      fs.statSync(path.join(PRESET_DIR, f)).isDirectory()
    );

    for (const folder of folders) {
      const folderPath = path.join(PRESET_DIR, folder);
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.CUBE') || f.endsWith('.cube'));

      const category = getCategory(folder);

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const name = file.replace(/\.[^/.]+$/, '');

        const formData = new FormData();
        formData.append('preset', fs.createReadStream(filePath));
        formData.append('name', name);
        formData.append('category', category);
        formData.append('format', 'cube');

        try {
          const response = await axios.post(API_URL, formData, {
            headers: formData.getHeaders()
          });
          console.log(`✅ Uploaded: ${name}`);
        } catch (error) {
          console.error(`❌ Failed: ${name} - ${error.message}`);
        }
      }
    }

    console.log('✅ All presets uploaded');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

uploadPresets();