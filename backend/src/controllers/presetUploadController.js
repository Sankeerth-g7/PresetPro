const presetModel = require('../models/presetModel');
const fs = require('fs').promises;
const path = require('path');

const uploadPreset = async (req, res) => {
  try {
    const { name, category, format } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No preset file uploaded' });
    }

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category required' });
    }

    const presetFile = req.file;
    const lutPath = presetFile.path;
    const thumbnailUrl = `https://via.placeholder.com/200?text=${encodeURIComponent(name)}`;

    const preset = await presetModel.createPreset(
      name,
      category,
      format || 'cube',
      lutPath,
      thumbnailUrl
    );

    res.json({
      message: 'Preset uploaded successfully',
      preset
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadPreset
};