#!/bin/sh
# Run every certificate and write its output to the directory given as $1.
# Environment: CC (C compiler), NODE (Node.js). About two seconds on one core.
set -eu
out=${1:?output directory}
CC=${CC:-cc}
NODE=${NODE:-node}
mkdir -p "$out/bin"
"$CC" -O2 -o "$out/bin/skewcheck" code/skewcheck.c
"$CC" -O2 -o "$out/bin/seed-sums" code/seed-sums.c
"$CC" -O2 -o "$out/bin/paley-primes" code/paley-primes.c

# 1. The archived matrix is skew Hadamard.
gzip -dc data/order-2120.signs.gz | "$out/bin/skewcheck" 2120 > "$out/skewcheck.txt"

# 2. Negative control: flip row 500, column 1700 (0-indexed); the checker must fail.
gzip -dc data/order-2120.signs.gz \
  | awk 'NR==501{c=substr($0,1701,1); $0=substr($0,1,1700) (c=="+"?"-":"+") substr($0,1702)}1' \
  | { "$out/bin/skewcheck" 2120 || true; } > "$out/skewcheck-control.txt"

# 3. The eight line sums and hypothesis (L) at p = 7, 23 and 263, with a failing control.
"$out/bin/seed-sums" > "$out/seed-sums.txt"

# 4. Order arithmetic.
"$out/bin/paley-primes" > "$out/paley-primes.txt"

# 5. Rebuild the matrix from the seed and the array, and compare it with the archive.
if command -v shasum >/dev/null 2>&1; then sha256() { shasum -a 256; }; else sha256() { sha256sum; }; fi
archived=$(gzip -dc data/order-2120.signs.gz | sha256 | cut -d" " -f1)
rebuilt=$("$NODE" code/verify-square-field-seeds.mjs --matrix 2> "$out/verify-seeds.txt" | sha256 | cut -d" " -f1)
if [ "$archived" = "$rebuilt" ]; then
  echo "rebuilt matrix equals data/order-2120.signs.gz after decompression" >> "$out/verify-seeds.txt"
else
  echo "rebuilt matrix DIFFERS from data/order-2120.signs.gz" >> "$out/verify-seeds.txt"
  exit 1
fi
