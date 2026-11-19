// Render data/order-2120.signs.gz as a PNG: white = +1, black = -1.
// Red gaps (not drawn over entries) separate the 4 border rows/columns and the
// four copies of F_529, so the 4 x 4 block layout of Lemma 2 is visible.
// Usage: node code/render-matrix.mjs data/order-2120.signs.gz figures/order-2120.png
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {gunzipSync, deflateSync} from 'node:zlib';

const [src, out] = process.argv.slice(2);
const rows = gunzipSync(readFileSync(src)).toString('ascii').split('\n').filter(r => r.length);
const N = rows.length;
if (N !== 2120 || rows.some(r => r.length !== N)) throw new Error('expected a 2120 x 2120 sign matrix');

const GAP = 4;
const cuts = [4, 4 + 529, 4 + 2 * 529, 4 + 3 * 529];       // gap inserted before these indices
const pos = i => i + GAP * cuts.filter(c => i >= c).length; // pixel position of entry index i
const W = N + GAP * cuts.length;

// Palette image, 8 bits per pixel: 0 = white, 1 = black, 2 = red.
const pix = new Uint8Array(W * W).fill(2);
for (let r = 0; r < N; ++r) {
  const y = pos(r), row = rows[r];
  for (let c = 0; c < N; ++c) pix[y * W + pos(c)] = row[c] === '+' ? 0 : 1;
}
const raw = Buffer.alloc(W * (W + 1));
for (let y = 0; y < W; ++y) {
  raw[y * (W + 1)] = 0;                                       // filter type: none
  raw.set(pix.subarray(y * W, (y + 1) * W), y * (W + 1) + 1);
}

const crcTable = Array.from({length: 256}, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; ++k) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = buf => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(W, 4);
ihdr[8] = 8; ihdr[9] = 3; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0; // 8-bit palette
const plte = Buffer.from([255, 255, 255, 0, 0, 0, 200, 30, 30]);
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr), chunk('PLTE', plte),
  chunk('IDAT', deflateSync(raw, {level: 9})), chunk('IEND', Buffer.alloc(0)),
]);
mkdirSync(dirname(out), {recursive: true});
writeFileSync(out, png);
console.error(`wrote ${out}: ${W} x ${W} pixels`);
