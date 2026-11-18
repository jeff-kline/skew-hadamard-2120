// Run with Node.js. Pass --matrix to emit the verified 2120 rows as ASCII signs.
import assert from 'node:assert/strict';

const mod = (x, p) => (x % p + p) % p;

function makeBlocks(p, negativeIndices) {
  const v = p * p;
  const exponents = new Int32Array(v).fill(-1);
  const representatives = [];
  let x = 1, y = 0;
  for (let e = 0; e < v - 1; ++e) {
    const point = p * x + y;
    assert.equal(exponents[point], -1, 'generator repeated early');
    exponents[point] = e;
    if (e < 16) representatives.push(point);
    [x, y] = [mod(x - 2 * y, p), mod(2 * x + y, p)];
  }
  assert.deepEqual([x, y], [1, 0]);
  assert.equal(exponents[0], -1);

  const blocks = Array.from({length: 4}, (_, j) =>
    Int8Array.from(exponents, e => {
      if (e === -1) return 1;
      const residue = (e + 2 * j) % 16;
      const h = negativeIndices.includes(residue % 8) ? -1 : 1;
      return residue < 8 ? h : -h;
    }));
  for (const f of blocks) {
    assert.equal(f.reduce((a, b) => a + b), 1);
    for (let t = 1; t < v; ++t) {
      const negative = p * mod(-Math.floor(t / p), p) + mod(-(t % p), p);
      assert.equal(f[negative], -f[t]);
    }
  }
  return {blocks, representatives};
}

function checkCorrelations(p, blocks, shifts) {
  for (const shift of shifts) {
    const dx = Math.floor(shift / p), dy = shift % p;
    let sum = 0;
    for (let x = 0; x < p; ++x) {
      const nextRow = p * ((x + dx) % p);
      for (let y = 0; y < p; ++y) {
        const point = p * x + y, shifted = nextRow + (y + dy) % p;
        for (const f of blocks) sum += f[point] * f[shifted];
      }
    }
    assert.equal(sum, shift === 0 ? 4 * p * p : -4);
  }
}

function borderedEntry(r, c, p, blocks) {
  const v = p * p;
  const blockRow = Math.floor((r - 4) / v), blockCol = Math.floor((c - 4) / v);
  if (r < 4 && c < 4) return corner[r][c];
  if (r < 4) return upper[r][blockCol];
  if (c < 4) return -upper[c][blockRow];
  const x = (r - 4) % v, y = (c - 4) % v;
  const x0 = Math.floor(x / p), x1 = x % p;
  const y0 = Math.floor(y / p), y1 = y % p;
  if (blockRow === blockCol) return blocks[0][p * mod(y0 - x0, p) + mod(y1 - x1, p)];
  // A R uses -(x+y), while R A uses x+y.
  const direction = blockRow === 0 || blockCol === 0 ? -1 : 1;
  const t = p * mod(direction * (x0 + y0), p) + mod(direction * (x1 + y1), p);
  const code = core[blockRow][blockCol];
  return Math.sign(code) * blocks[Math.abs(code) - 1][t];
}

function popcount(x) {
  x -= (x >>> 1) & 0x55555555;
  x = (x & 0x33333333) + ((x >>> 2) & 0x33333333);
  return Math.imul((x + (x >>> 4)) & 0x0f0f0f0f, 0x01010101) >>> 24;
}

function checkMatrix(p, blocks, emit) {
  const N = 4 * (p * p + 1), words = Math.ceil(N / 32);
  const rows = Array.from({length: N}, () => new Uint32Array(words));
  for (let r = 0; r < N; ++r) {
    for (let c = 0; c < N; ++c) {
      const sign = borderedEntry(r, c, p, blocks);
      assert.ok(sign === 1 || sign === -1);
      if (sign === -1) rows[r][c >>> 5] |= 1 << (c % 32);
    }
  }
  const bit = (r, c) => (rows[r][c >>> 5] >>> (c % 32)) & 1;
  for (let r = 0; r < N; ++r) {
    assert.equal(bit(r, r), 0);
    for (let s = 0; s < r; ++s) {
      assert.equal(bit(r, s) + bit(s, r), 1);
      let distance = 0;
      for (let j = 0; j < words; ++j) distance += popcount(rows[r][j] ^ rows[s][j]);
      assert.equal(distance, N / 2);
    }
  }
  console.error('2120 matrix: diagonal +1, skew off the diagonal, every row-pair distance 1060');
  if (emit) {
    for (let r = 0; r < N; ++r) {
      let line = '';
      for (let c = 0; c < N; ++c) line += bit(r, c) ? '-' : '+';
      process.stdout.write(line + '\n');
    }
  }
}

const corner = [[1,1,1,1],[-1,1,-1,1],[-1,1,1,-1],[-1,-1,1,1]];
const upper = [[-1,-1,-1,-1],[-1,-1,1,1],[-1,1,1,-1],[-1,1,-1,1]];
const core = [[1,2,3,4],[-2,1,-4,3],[-3,4,1,-2],[-4,-3,2,1]];
for (const [p, negativeIndices] of [[23, [2]], [263, [1,2]]]) {
  const {blocks, representatives} = makeBlocks(p, negativeIndices);
  // Multiplication by z^16 fixes every mask and permutes each nonzero shift class.
  const shifts = p === 23 ? Array.from({length: p*p}, (_, i) => i) : [0, ...representatives];
  checkCorrelations(p, blocks, shifts);
  console.error(`F_${p}^2: four skew blocks, ${shifts.length} correlation checks passed`);
  if (p === 23) checkMatrix(p, blocks, process.argv.includes('--matrix'));
}
