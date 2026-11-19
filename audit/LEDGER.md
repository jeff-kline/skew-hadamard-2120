# Audit ledger

This file is append-only. Each audit records its scope, what it checked, its
findings and their dispositions. The auditors are process-separated AI agents
in fresh contexts; they are not independent expert reviewers, and their
agreement is not peer review. Finding labels: error, gap, missing hypothesis,
sharpening, documentation.

## 2026-11-18 — reviews of the working drafts (before the release cycle)

- **Auditor:** Claude (Opus), the session that later prepared the release.
- **Scope:** the longer working draft, its order arithmetic and its priority comparison.
- **Checks by hand:**
  - the expansion theorem;
  - the order-49 seed;
  - the four-block minimum;
  - the inequivalence argument;
  - all eight line sums at $p=23$ (from the 24-step recurrence);
  - Garcia's Corollary 2.5, read in full.
- **Findings and dispositions:**
  - D1 (sharpening): the minimum covers only all-skew families. The two-block construction of Blatt and Szekeres needs only its first block skew. Disposition: stated in the paper after Theorem 7.
  - D2 (sharpening): the inequivalence argument excludes every matrix with a doubly transitive column group, not only Paley I. Adopted.
  - D3 (documentation): a census link used a conference host with an invalid TLS certificate. Disposition: cited with the PDF date and retrieval date.
  - D4 (gap, priority): a product theorem of order $mn/2$ could reach 2120. Disposition: checked; see audit/PRIOR-ART.md.

## 2026-11-18 — cold examination of the note

Two process-separated agents (Fable) worked in fresh contexts. Neither ran any program.

### Stage 1: isolated failure search

The agent saw statements and data only, with the proofs withheld.

- **Verdict:** NOT-BROKEN on every claim. The $p=263$ values were UNRESOLVED (machine-asserted).
- **Hand checks:**
  - every Gram block of the bordered array;
  - the $p=23$ recurrence and all eight sums;
  - the reduction to the parity condition.
- **Findings and dispositions:**
  - S1 (missing hypothesis): the inequivalence remark fails for the trivial group, $v=1$, which gives the Sylvester matrix of order 8. Disposition: no change; the remark concerns the matrices of the paper, all with $v\ge49$.
  - S2 (documentation): the $p=263$ sums are machine-computed. Disposition: labeled in the abstract and Section 3; program added (`code/seed-sums.c`).
  - S3 (error): "Momihara and Xiang reach order 4240" was an inference; their matrix corollaries use two or four blocks. Disposition: fixed (see A1 below).
  - S4 (documentation): the census bears on 2120 only through order 1060. Disposition: stated.
- **Isolation note:** the agent's start-up context included a one-line memory index of the campaign.

### Stage 2: proof audit

The agent read the full note.

- **Verdict:** Theorem 1 VERIFIED. Lemma 2, Section 3, the $p=23$ certificate, the $p=7$ seed, Theorem 5 and Theorem 7 VERIFIED. The relation paragraph had a GAP.
- **Findings and dispositions:**
  - A1 (error): the abstract and the relation paragraph credited Momihara–Xiang with order 4240. Their Theorem 1.5 gives eight blocks on $\mathbb F_{529}$ and no matrix. Disposition: fixed. Order 4240 is now credited to the amicable product (Koukouvinos–Stylianou Theorem 13).
  - A2 (missing hypothesis): the inequivalence remark needs a group doubly transitive *on columns*. The product of the four border columns is $+1$ everywhere, so the transposed argument fails. Disposition: fixed.
  - A3 (documentation): the line-representative hypothesis is now stated once, as (L), with $z^{p+1}=N(z)=5$ and quadratic reciprocity replacing two machine facts.
  - A4 (documentation): `z^24, z^88, z^132` lie outside $\mathbb F_{263}$, checked by hand by the auditor. Disposition: stated.
  - Wording items, all adopted:
    - the amicable-product sentence;
    - the attribution of the array;
    - $v\equiv1\pmod4$ removed from the seed definition;
    - "random element of the stabilizer";
    - the provenance of the $p=7$ seed;
    - the search model at $p=71$ (the rule needs $5$ to be a nonsquare);
    - a pointer for the Paley primes;
    - the census date.
  - A5 (gap): the class-count claim had no proof in the note. Disposition: withdrawn; the paper states only the $2^{L_n}$ distinct masks.
  - A6 (documentation): the matrix check rested on a recorded run with no source. Disposition: `code/skewcheck.c` added. Under `make verify` it passes on the archived file, and a one-entry negative control fails.
  - A7 (gap, source): Koukouvinos–Stylianou Theorem 13 was not openly accessible to the auditor. Disposition: the author supplied the full text. Theorem 13 gives a skew matrix of order $mh$ from amicable matrices of order $m$ and a skew matrix of order $h$. No construction in that survey reaches 2120 or 1060 (audit/PRIOR-ART.md).

**Numbering note (2026-11-18).** The two entries above use the draft's
theorem numbers. The compiled paper numbers theorems, lemmas and corollaries
on one counter: Theorem 3 is the expansion (draft "Theorem 5"), Corollary 4
the orders ("Corollary 6") and Theorem 5 the minimum ("Theorem 7").

## 2026-11-18 — release audits of the draft commit 3abbb4e

Four process-separated agents worked in fresh contexts, all read-only: claims
consistency (Sonnet), end-to-end proof (Fable, hand arithmetic only),
citations (Sonnet), and reproducibility (Sonnet; it ran only `make verify` and
`make paper` on a clean `git archive`).

### Reproducibility

- **Verdict:** PASS. Five MATCH lines; the rebuilt PDF hash equals the pinned one.
- **Optional findings, all adopted:**
  - R-O1 (documentation): the PDF hash depends on the TeX version. Stated in VERIFICATION.md.
  - R-O2 (documentation): `shasum` may be missing on minimal Linux. Fallback to `sha256sum` added.
  - R-O3 (documentation): `skewcheck.c` needs gcc or clang. Stated in the README.

### Claims consistency

- **Verdict:** PARTIAL.
- **Must-fix findings and dispositions:**
  - C-M1 (error): the README, ADMISSION, PRIOR-ART and this ledger cited "Theorem 5, Corollary 6, Theorem 7". The compiled numbers are Theorem 3, Corollary 4 and Theorem 5. Fixed in all living files; numbering note added above.
  - C-M2 (gap): the $p=263$ machine-dependence caveat was missing from the README "What is new", ADMISSION, CITATION.cff and Corollary 4. Fixed.
  - C-M3 (documentation): process-history phrases in the paper. Fixed:
    - "found earlier in the same project" removed with the new $p=7$ paragraph;
    - "This note" changed to "This paper";
    - the search sentence reworded.
    - The July 2026 provenance sentence is kept, as credit to the author's own earlier search.
  - C-M4 (sharpening): terms used before definition. Fixed:
    - "seed" is defined at first use in the README and the paper's introduction;
    - "Paley I" is defined;
    - "index 16" is explained in both places it occurs.
- **Optional findings and dispositions:**
  - "They lie far outside the published tables" is replaced by "we have not compared them with every published construction".
  - The README residuals now list all three.
  - The README item on odd powers says no priority is claimed beyond 2120.
  - The CITATION.cff abstract gives the limits.
  - The `seed-sums.c` comment says "paper".
  - The CITATION.cff `message` is kept, as in the predecessor's candidate.

### Citations

- **Verdict:** PARTIAL, with no wrong citation. Confirmed against the sources:
  - Cati–Pasechnik Table 5 265(4);
  - Momihara–Xiang Theorem 1.5, Proposition 1.4 ($q\equiv9\pmod{16}$), Propositions 1.1 and 1.3, Corollaries 1.6–1.7;
  - Seberry–Yamada Lemma 2.4 (p. 443);
  - Koukouvinos–Stylianou Theorem 13 and Corollary 1;
  - the bibliographic data of Turyn, Blatt–Szekeres, Momihara, Lehmer and Orrick;
  - census $v=265$ undecided.
- **Dispositions:**
  - the Momihara reference now uses DOI 10.37236/9058;
  - a Wallis–Whiteman entry was added (Bull. Austral. Math. Soc. 7 (1972), 233–249, checked on the publisher page);
  - the census keeps its PDF date and retrieval date.
- **Not checked by this lane, and how they are covered:**
  - the census URL itself (read by the author's session on 2026-11-18);
  - Orrick's journal pagination (secondary sources agree);
  - the end page of the Seberry–Yamada chapter.

### End-to-end proof

- **Verdict:** VERIFIED for Lemma 2, Section 3, the $p=23$ certificate (all 24 powers recomputed), the $p=7$ paragraph, Theorem 3, Theorem 5 and the inequivalence remark.
- **Must-fix findings and dispositions:**
  - P-M1 (gap): the paper never connected Theorem 5 (skew sets) to seeds (masks). Fixed: a paragraph after the proof shows $|\widehat{\mathbf 1_{B_i}}|^2=(1+|\widehat{g_i}|^2)/4$, so constant energy is equivalent to constant difference multiplicity.
  - P-M2 (documentation): $z$ meant both $1+2i$ and a slope in the $p=7$ paragraph. Fixed by the $p=7$ change below. The $n=3$ example now uses $x_1,x_2,x_3$.
  - P-M3 (documentation): the trace-zero assertion for the Agayan–Sarukhanyan array had no justification. Fixed with a one-line reason: corresponding diagonal entries of the two diagonal blocks are negatives.
  - P-M4 (documentation): the self-orthogonality of the code was attributed to Orrick without a check. Fixed: a short proof is now in the remark, with Orrick kept as "compare".
- **Optional findings and dispositions:**
  - P-O1 (sharpening): $p=7$ satisfies (L) and the Section 3 rule. The auditor found $h=(+,+,-,-,+,-,-,+)$ by hand, with $d=(5,1,-1,3,1,-3,1,3)$. Confirmed by `code/seed-sums.c`, now extended to $p=7$, and by hand by the root agent (real parts $1,1,4,3,0,6,5,1$; $z^8=5$). Adopted: the paper's $p=7$ seed is now this one, and the separate projective construction is dropped. The abstract's "the same method works in characteristics 7 and 263" is now literal.
  - Corollary 4 has a proof line and the machine caveat.
  - Notation: the quadratic character in Section 4 is now $\chi$, and the sets in Theorem 5 are $B_i$.
  - Section 4 notes that unpaired factors vanish at the principal character.
  - "Listed in a table" became "listed in Section 3".
  - Wallis–Whiteman added to the bibliography.

## 2026-11-18 — figure added at the author's request (before the tag)

- **Change:** `figures/order-2120.png` is rendered from the archived matrix by
  the new `code/render-matrix.mjs` (pure Node.js; one pixel per entry, red gaps
  between blocks, no entry drawn over). It is shown in the README and as
  Figure 1 of the paper, with a caption naming the blocks of Lemma 2. A
  `make figure` target and a VERIFICATION.md section with the figure's hash
  were added.
- **Check:** the figure is byte-identical on regeneration. Before rendering,
  the author's session also re-checked $HH^{\mathsf T}=2120I$ and
  $H+H^{\mathsf T}=2I$ from the archived file. No claim changed; the paper
  text changed only by the figure, its caption and one sentence pointing to
  it.
- **Revision (same day, author's review):** the full rendering doubled the PDF
  (270 KB to 543 KB) and added little to the paper. Figure 1 of the paper is now a
  TikZ schematic of the bordered array: corner, borders, the $4\times4$ block
  grid with labels and dimensions, and a caption showing why $H+H^{\mathsf T}=2I$
  (corner and diagonal blocks satisfy $X+X^{\mathsf T}=2I$; the left border is
  the negative transpose of the top border; mirror blocks are negative
  transposes because $D_i$ and $T_i$ are symmetric). The full rendering is kept
  in the README only. PDF size is now 281 KB.

## 2026-11-18 — tag, archive and admission

- Tag `v0.1.0` (object `64e2d55`) → `29a928f`; the tagged-state audit passed
  8 of 8. The GitHub Release was published at 2026-11-19 00:12 UTC.
- Zenodo record 24356140 (version DOI 10.5281/zenodo.24356140, concept DOI
  10.5281/zenodo.24356139). The Zenodo file is byte-identical to the GitHub
  zipball pinned before the Release (SHA-256 `c6cc7730…2c70`); the
  archived-state audit passed 11 of 11.
- Living metadata: README status paragraph and DOI badge, `CITATION.cff` DOI,
  identifiers and `date-released`, the paper's DOI line, ADMISSION ADMITTED and
  the CORRECTIONS version history. The tagged snapshot keeps its
  prepublication wording.
- P1 residual (two dicyclic relative-difference-set papers in preview only;
  citations of Momihara–Xiang not screened) was stated to the author before the
  freeze, and the author approved the freeze and the admission with it.
