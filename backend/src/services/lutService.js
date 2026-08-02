const fs = require('fs');
const sharp = require('sharp');
const ndarray = require('ndarray');
const ops = require('ndarray-ops');
const parseCubeLUT = require('parse-cube-lut');
const applyCubeLUT = require('apply-cube-lut');

class LUTService {
  constructor() {
    this.lutCache = new Map();
  }

  async loadCubeLUT(filePath) {
    if (this.lutCache.has(filePath)) {
      return this.lutCache.get(filePath);
    }

    try {
      const cubeText = fs.readFileSync(filePath, 'utf8');
      const lut = parseCubeLUT(cubeText);
      this.lutCache.set(filePath, lut);
      return lut;
    } catch (error) {
      throw new Error(`Failed to load LUT: ${error.message}`);
    }
  }

  async applyLUT(imagePath, lut) {
    try {
      const image = sharp(imagePath);
      const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const { width, height } = info;

      // Create ndarrays
      const srcArray = ndarray(new Float32Array(data), [height, width, 4]);
      const destArray = ndarray(new Float32Array(data.length), [height, width, 4]);

      // Extract RGB channels
      const srcRGB = srcArray.hi(height, width, 3);
      const destRGB = destArray.hi(height, width, 3);

      // Normalize to 0-1
      ops.mulseq(srcRGB, 1.0 / 255.0);

      // Apply LUT
      applyCubeLUT(destRGB, srcRGB, lut);

      // Scale back to 0-255
      ops.mulseq(destRGB, 255.0);

      // Re-attach alpha channel
      const srcAlpha = srcArray.pick(null, null, 3);
      const destAlpha = destArray.pick(null, null, 3);
      ops.assign(destAlpha, srcAlpha);

      // Convert to buffer
      const finalBuffer = Buffer.from(Uint8Array.from(destArray.data));

      return sharp(finalBuffer, { raw: { width, height, channels: 4 } });
    } catch (error) {
      throw new Error(`Failed to apply LUT: ${error.message}`);
    }
  }

  async saveEditedImage(sharpImage, outputPath) {
    try {
      await sharpImage.jpeg({ quality: 95 }).toFile(outputPath);
      return outputPath;
    } catch (error) {
      throw new Error(`Failed to save image: ${error.message}`);
    }
  }
}

module.exports = new LUTService();