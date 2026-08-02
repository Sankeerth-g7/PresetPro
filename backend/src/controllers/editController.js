const editModel = require('../models/editModel');
const lutService = require('../services/lutService');
const path = require('path');
const fs = require('fs').promises;

const applyPreset = async (req, res) => {
  try {
    const { presetId } = req.body;
    
    console.log('Request body:', req.body);
    console.log('File:', req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    if (!presetId) {
      return res.status(400).json({ error: 'Preset ID required' });
    }

    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const originalPath = req.file.path;
    const editId = Date.now();
    const editedFileName = `edited_${editId}.jpg`;
    const editedPath = path.join(uploadDir, editedFileName);

    console.log('Original path:', originalPath);
    console.log('Edited path:', editedPath);

    // Create edit record
    const edit = await editModel.createEdit(originalPath, editedFileName, presetId);

    // Load LUT preset
    const presetModel = require('../models/presetModel');
    const preset = await presetModel.getPresetById(presetId);
    
    console.log('Preset:', preset);

    if (!preset) {
      return res.status(404).json({ error: 'Preset not found' });
    }

    const lutData = await lutService.loadCubeLUT(preset.lut_path);
    console.log('LUT loaded, size:', lutData.size, 'data points:', lutData.data.length);

    // Apply LUT to image
    const processedImage = await lutService.applyLUT(originalPath, lutData);
    console.log('LUT applied, image size:', processedImage.length);

    // Save edited image
    await lutService.saveEditedImage(processedImage, editedPath);
    console.log('Image saved');

    // Update edit status
    await editModel.updateEditStatus(edit.id, 'completed', editedFileName);

    res.json({
      editId: edit.id,
      status: 'completed',
      downloadUrl: `/uploads/${editedFileName}`,
      fileName: editedFileName
    });

  } catch (error) {
    console.error('Error in applyPreset:', error);
    res.status(500).json({ error: error.message });
  }
};

const getEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const edit = await editModel.getEditById(id);
    res.json(edit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  applyPreset,
  getEdit
};