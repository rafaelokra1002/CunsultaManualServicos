// generate-icons.js — generates PWA icons as PNG using Jimp (pure JS, no native deps)
// Usage: node generate-icons.js

const fs = require("fs");
const path = require("path");

// Create a simple PNG with a gradient background and "OD" text
// Using raw pixel manipulation to create a basic icon

function createPNG(size) {
  // PNG file structure
  const width = size;
  const height = size;
  
  // Create raw RGBA pixel data
  const pixels = Buffer.alloc(width * height * 4);
  
  const cx = width / 2;
  const cy = height / 2;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      
      // Gradient background - dark purple to deep dark
      const gradientT = y / height;
      const r = Math.round(10 + gradientT * 8);   // 10 -> 18
      const g = Math.round(10 + gradientT * 6);   // 10 -> 16
      const b = Math.round(15 + gradientT * 20);  // 15 -> 35
      
      // Rounded rectangle mask
      const margin = size * 0.08;
      const radius = size * 0.18;
      const inRect = x >= margin && x < width - margin && y >= margin && y < height - margin;
      
      // Simple circle in center with accent color
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const circleR = size * 0.32;
      
      if (dist < circleR) {
        // Purple accent circle
        const fade = Math.max(0, 1 - dist / circleR);
        pixels[idx] = Math.round(108 * fade + r * (1 - fade));     // R - #6c
        pixels[idx + 1] = Math.round(92 * fade + g * (1 - fade));  // G - #5c
        pixels[idx + 2] = Math.round(231 * fade + b * (1 - fade)); // B - #e7
        pixels[idx + 3] = 255;
      } else {
        pixels[idx] = r;
        pixels[idx + 1] = g;
        pixels[idx + 2] = b;
        pixels[idx + 3] = 255;
      }
      
      // Draw "OD" letters using simple pixel font
      const letterSize = size * 0.22;
      const letterY = cy - letterSize / 2;
      
      // Letter O - left
      const oX = cx - letterSize * 0.7;
      const oDistX = (x - oX) / (letterSize * 0.4);
      const oDistY = (y - cy) / (letterSize * 0.5);
      const oDist = oDistX * oDistX + oDistY * oDistY;
      if (oDist < 1 && oDist > 0.45) {
        pixels[idx] = 228;
        pixels[idx + 1] = 228;
        pixels[idx + 2] = 239;
        pixels[idx + 3] = 255;
      }
      
      // Letter D - right
      const dX = cx + letterSize * 0.35;
      const dLeftX = dX - letterSize * 0.35;
      const dDistX = (x - dX) / (letterSize * 0.38);
      const dDistY = (y - cy) / (letterSize * 0.5);
      const dDist = dDistX * dDistX + dDistY * dDistY;
      
      // D vertical bar
      if (x >= dLeftX && x <= dLeftX + letterSize * 0.15 && Math.abs(y - cy) < letterSize * 0.5) {
        pixels[idx] = 108;
        pixels[idx + 1] = 92;
        pixels[idx + 2] = 231;
        pixels[idx + 3] = 255;
      }
      // D curve (right half of ellipse)
      if (dDistX >= -0.2 && dDist < 1 && dDist > 0.5) {
        pixels[idx] = 108;
        pixels[idx + 1] = 92;
        pixels[idx + 2] = 231;
        pixels[idx + 3] = 255;
      }
    }
  }
  
  return encodePNG(pixels, width, height);
}

function encodePNG(pixels, width, height) {
  const zlib = require("zlib");
  
  // Add filter byte (0 = None) before each row
  const rawData = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    rawData[y * (width * 4 + 1)] = 0; // filter: None
    pixels.copy(rawData, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  
  const compressed = zlib.deflateSync(rawData);
  
  // Build PNG
  const chunks = [];
  
  // Signature
  chunks.push(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  chunks.push(makeChunk("IHDR", ihdr));
  
  // IDAT
  chunks.push(makeChunk("IDAT", compressed));
  
  // IEND
  chunks.push(makeChunk("IEND", Buffer.alloc(0)));
  
  return Buffer.concat(chunks);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  
  const typeBuffer = Buffer.from(type, "ascii");
  const crcData = Buffer.concat([typeBuffer, data]);
  
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcData), 0);
  
  return Buffer.concat([len, typeBuffer, data, crc]);
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Generate
const dir = path.join(__dirname, "public", "icons");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

[192, 512].forEach((size) => {
  const png = createPNG(size);
  const filePath = path.join(dir, `icon-${size}x${size}.png`);
  fs.writeFileSync(filePath, png);
  console.log(`Generated ${filePath} (${png.length} bytes)`);
});
