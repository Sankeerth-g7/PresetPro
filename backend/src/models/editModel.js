const db = require('../utils/db');

const initEditTable = async () => {
  await db.none(`
    CREATE TABLE IF NOT EXISTS photo_edits (
      id SERIAL PRIMARY KEY,
      original_file_path VARCHAR(500) NOT NULL,
      edited_file_path VARCHAR(500),
      preset_id INTEGER REFERENCES presets(id),
      file_name VARCHAR(255),
      processing_status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('✅ Photo edits table initialized');
};

const createEdit = async (originalPath, fileName, presetId) => {
  return db.one(
    `INSERT INTO photo_edits (original_file_path, file_name, preset_id)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [originalPath, fileName, presetId]
  );
};

const updateEditStatus = async (editId, status, editedPath = null) => {
  return db.one(
    `UPDATE photo_edits SET processing_status = $1, edited_file_path = $2
     WHERE id = $3
     RETURNING id, processing_status`,
    [status, editedPath, editId]
  );
};

const getEditById = async (id) => {
  return db.one('SELECT * FROM photo_edits WHERE id = $1', [id]);
};

module.exports = {
  initEditTable,
  createEdit,
  updateEditStatus,
  getEditById
};