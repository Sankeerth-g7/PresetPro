const dotenv = require('dotenv');
const path = require('path');

dotenv.config(path.join(__dirname, '../.env'));

const express = require('express');
const cors = require('cors');
const db = require('./utils/db');
const presetModel = require('./models/presetModel');
const editModel = require('./models/editModel');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/presets', require('./routes/presets'));
app.use('/api/presets', require('./routes/presetUpload'));
app.use('/api/edit', require('./routes/edit'));



// Initialize database tables
const initDB = async () => {
  try {
    await presetModel.initPresetTable();
    await editModel.initEditTable();
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Database init error:', error.message);
  }
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server running' });
});

// Routes
app.use('/api/presets', require('./routes/presets'));
app.use('/api/edit', require('./routes/edit'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, async () => {
  await initDB();
  console.log(`✅ PresetPro server running on http://localhost:${PORT}`);
});