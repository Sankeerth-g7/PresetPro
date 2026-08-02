const express = require('express');
const router = express.Router();
const upload = require('../utils/fileHandler');
const presetUploadController = require('../controllers/presetUploadController');

// Update fileHandler to accept .cube and .dng
router.post('/upload', upload.single('preset'), presetUploadController.uploadPreset);

module.exports = router;