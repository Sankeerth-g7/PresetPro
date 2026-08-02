const express = require('express');
const router = express.Router();
const presetController = require('../controllers/presetController');

router.get('/', presetController.getAllPresets);
router.get('/:id', presetController.getPresetById);
router.get('/category/:category', presetController.getPresetsByCategory);

module.exports = router;