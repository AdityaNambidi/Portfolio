import opentype from 'opentype.js';
import fs from 'fs';

const FONT_URL =
  'https://fonts.gstatic.com/s/archivo/v25/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q-EsJaRE-NWIDdgffTTnTRp8A.ttf';

const res = await fetch(FONT_URL);
const buffer = Buffer.from(await res.arrayBuffer());
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

const VIEW = 32;
const PADDING = 5;

const probe = font.getPath('A', 0, 0, 24);
const probeBox = probe.getBoundingBox();
const probeW = probeBox.x2 - probeBox.x1;
const probeH = probeBox.y2 - probeBox.y1;
const scale = (VIEW - PADDING * 2) / Math.max(probeW, probeH);
const fontSize = 24 * scale;

const placed = font.getPath('A', 0, 0, fontSize);
const box = placed.getBoundingBox();
const cx = (box.x1 + box.x2) / 2;
const cy = (box.y1 + box.y2) / 2;
const x = VIEW / 2 - cx;
const y = VIEW / 2 - cy;

const pathData = font.getPath('A', x, y, fontSize).toPathData(2);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}">
  <rect width="${VIEW}" height="${VIEW}" fill="#0F0E11"/>
  <path fill="#CDFB5B" d="${pathData}"/>
</svg>
`;

fs.writeFileSync('public/favicon.svg', svg);
console.log('Generated public/favicon.svg from Archivo ExtraCondensed 900');
