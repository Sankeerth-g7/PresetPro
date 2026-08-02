const express = require('express');
const router = express.Router();
const upload = require('../utils/fileHandler');
const editController = require('../controllers/editController');

router.post('/apply-preset', upload.single('image'), editController.applyPreset);
router.get('/:id', editController.getEdit);
router.get('/download/:fileName', (req, res) => {
  const { fileName } = req.params;
  const uploadDir = process.env.UPLOAD_DIR || './uploads';
  const filePath = require('path').join(uploadDir, fileName);
  res.download(filePath);
});

module.exports = router;