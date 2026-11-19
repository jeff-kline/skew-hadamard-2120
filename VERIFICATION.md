# Verification record

## Environment of the pinned run (2026-11-18)

- macOS 26.6.2, x86_64, one core, run under `nice`.
- Node.js v22.11.0, the official binary from nodejs.org.
- Apple clang 21.0.0, used as `cc -O2`.
- pdfTeX 3.141592653-2.6-1.40.22 (TeX Live 2021).

The programs need no packages, no network and no precomputed tables. Their
SHA-256 hashes are in [MANIFEST.sha256](MANIFEST.sha256).

## Commands

```sh
make verify NODE=/path/to/node CC=cc
make paper
```

`make verify` runs [code/run-certificates.sh](code/run-certificates.sh). It
writes five outputs to `build/certificates/` and compares each byte for byte
with its pinned copy in [evidence/](evidence/), printing one `MATCH` line per
file. It fails on any mismatch, or if the number of outputs differs. The total
running time is about two seconds.

## What each certificate checks

| Paper step | Program | Pinned output |
|---|---|---|
| Theorem 1: the archived matrix is skew Hadamard. All 2,246,140 row pairs have Hamming distance 1060, the diagonal is $+1$, and opposite entries are negatives | `skewcheck.c`, reading `data/order-2120.signs.gz` | `skewcheck.txt` |
| Negative control: one flipped entry is detected | `skewcheck.c` on a modified copy | `skewcheck-control.txt` |
| Section 3: hypothesis (L) and the eight sums $d_c$ at $p=7$, $23$ and $263$; a sign choice that fails | `seed-sums.c` | `seed-sums.txt` |
| Section 3, independently: the aggregate autocorrelation is $-4$ at every nonzero shift (all 528 at $p=23$; one per class of index 16 at $p=263$). The matrix is rebuilt from the seed and the array of Lemma 2, checked, and compared with the archived file | `verify-square-field-seeds.mjs --matrix` | `verify-seeds.txt` |
| Order arithmetic: $199$, $470599$ and $1129900999$ are primes $\equiv3\pmod4$; $2119=13\cdot163$; $1059=3\cdot353$; $4(23^6+1)=592143560$ | `paley-primes.c` | `paley-primes.txt` |

`skewcheck.c` shares no code with the construction or with
`verify-square-field-seeds.mjs`.

## The matrix file

`data/order-2120.signs.gz` holds 2,120 lines of 2,120 characters `+` or `-`.
The four border rows come first, then the four field copies of size 529 in
the order of Lemma 2. The SHA-256 of the compressed file is

```text
fc6dbe5174b916fd413202c421d06ab6a6231d7d44368451ba955fc439006899
```

## Paper build

`make paper` runs pdfLaTeX three times with a fixed `SOURCE_DATE_EPOCH` and
fails on any warning, overfull box or undefined reference. With the pdfTeX
version listed above, the release PDF `paper/main.pdf` has SHA-256

```text
15efda521d70d0554a13479cf86885092ee69cfc7c89b020339e000b744c343f
```

Other TeX distributions embed different font and metadata bytes, so a
different PDF hash there is expected and is not a failure.
## Figure

`make figure NODE=/path/to/node` regenerates `figures/order-2120.png` from
the archived matrix with [code/render-matrix.mjs](code/render-matrix.mjs). It
writes one pixel per entry (white $+1$, black $-1$) and inserts red gaps
between the border and the four field copies; no entry is drawn over. With
Node.js v22.11.0 the output is byte-identical to the committed figure,
SHA-256

```text
c263470e02b3bff262f2ca0f413bf43bc7fa5efbc837fccd17575a3d67fcddd2
```

Another zlib version may compress differently; the decoded pixels are the
same.
