const presetModel = require('../models/presetModel');

const getAllPresets = async (req, res) => {
  try {
    console.log('Fetching presets...');
    const presets = await presetModel.getAllPresets();
    console.log('Presets found:', presets.length);
    res.json(presets);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getPresetById = async (req, res) => {
  try {
    const { id } = req.params;
    const preset = await presetModel.getPresetById(id);
    res.json(preset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPresetsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const presets = await require('../utils/db').any(
      'SELECT id, name, category, thumbnail_url FROM presets WHERE category = $1 ORDER BY name',
      [category]
    );
    res.json(presets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPresets,
  getPresetById,
  getPresetsByCategory
};