const db = require('../utils/db');

const initPresetTable = async () => {
  await db.none(`
    CREATE TABLE IF NOT EXISTS presets (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      original_format VARCHAR(50),
      lut_path VARCHAR(500) NOT NULL,
      lut_data BYTEA,
      thumbnail_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('✅ Presets table initialized');
};

const getAllPresets = async () => {
  return db.any('SELECT id, name, category, thumbnail_url FROM presets ORDER BY category');
};

const getPresetById = async (id) => {
  return db.one('SELECT * FROM presets WHERE id = $1', [id]);
};

const createPreset = async (name, category, format, lutPath, thumbnailUrl) => {
  return db.one(
    `INSERT INTO presets (name, category, original_format, lut_path, thumbnail_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, category`,
    [name, category, format, lutPath, thumbnailUrl]
  );
};

module.exports = {
  initPresetTable,
  getAllPresets,
  getPresetById,
  createPreset
};