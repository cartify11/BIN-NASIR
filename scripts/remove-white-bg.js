const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function removeBackground() {
  const inputPath = path.join(__dirname, '../public/images/logo.png');
  const backupPath = path.join(__dirname, '../public/images/logo-original.png');
  const outputPath = path.join(__dirname, '../public/images/logo.png');

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
  }

  // Load image as raw RGBA buffer
  const image = sharp(backupPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels; // 4: R, G, B, A

  // BFS / Flood Fill from borders
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isWhite(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Consider white/near white if R, G, B are all > 230 or very close to 255
    return r > 230 && g > 230 && b > 230;
  }

  // Add all boundary pixels that are white to queue
  for (let x = 0; x < width; x++) {
    if (isWhite(x, 0)) {
      queue.push([x, 0]);
      visited[0 * width + x] = 1;
    }
    if (isWhite(x, height - 1)) {
      queue.push([x, height - 1]);
      visited[(height - 1) * width + x] = 1;
    }
  }

  for (let y = 0; y < height; y++) {
    if (!visited[y * width + 0] && isWhite(0, y)) {
      queue.push([0, y]);
      visited[y * width + 0] = 1;
    }
    if (!visited[y * width + (width - 1)] && isWhite(width - 1, y)) {
      queue.push([width - 1, y]);
      visited[y * width + (width - 1)] = 1;
    }
  }

  let head = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const pIdx = (cy * width + cx) * channels;

    // Set pixel alpha to 0 (completely transparent)
    data[pIdx + 3] = 0;

    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIndex = ny * width + nx;
        if (!visited[nIndex] && isWhite(nx, ny)) {
          visited[nIndex] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  console.log(`Processed ${queue.length} transparent background pixels out of ${width * height}`);

  // Save as high-quality transparent PNG
  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(outputPath);

  console.log('Successfully saved transparent logo to:', outputPath);
}

removeBackground().catch(console.error);
