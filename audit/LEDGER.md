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
