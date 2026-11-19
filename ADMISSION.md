# Admission record

**Current state:** ADMITTED

Current verdict: ADMITTED (2026-11-18)

**Version:** 0.1.0

**Tag:** `v0.1.0` → `29a928fd30ee9415d7b1768d05d9176711f70d9f`

**Version DOI:** [`10.5281/zenodo.24356140`](https://doi.org/10.5281/zenodo.24356140) · **Concept DOI:** `10.5281/zenodo.24356139` · **Record:** <https://zenodo.org/records/24356140>

**Standard:** [A Public Standard for This Work](https://jeff-kline.github.io/posts/research-program/index.html)

Admission is a project release decision. It is not peer review, a correctness
certificate, or proof of global novelty.

**Scope set by the author.** On 2026-11-18 the author asked for a release of
the order-2120 result together with its method:

- the seed at $p=23$ and its certificate;
- the bordered array;
- the seeds at $p=7$ and $p=263$;
- the expansion to odd powers;
- the four-block minimum.

The author approved the repository name `skew-hadamard-2120` and directed
that the release follow the pattern of
[order18-jacobi-hadamard-automorphisms](https://github.com/jeff-kline/order18-jacobi-hadamard-automorphisms).
Each external action needs the author's explicit authorization.

## Principal claim

There is an explicit skew Hadamard matrix of order $2120=2^3\cdot265$
(paper Theorem 1). We found no earlier published construction at this order.
The recorded least exponent for odd part 265 drops from four to at most
three.

Further results:

- seeds at $p=7$, $23$ and $263$;
- the expansion to $4(p^{2n}+1)$ for odd $n$ (Theorem 3, Corollary 4); the seed
  at $p=263$ rests on a machine computation;
- four is the minimum for all-skew families on these groups (Theorem 5).

Limits: order 1060 remains open, and the minimum covers only families in which
every block is skew.

## Gates

| Gate | Status | Evidence or residual |
|---|---|---|
| P1 prior work and credit | PARTIAL, residual accepted | `audit/PRIOR-ART.md`; searches of 2026-11-18 (GitHub repositories and code with a positive control, arXiv, citations of Cati–Pasechnik, the November 2026 survey of Egan et al.); Koukouvinos–Stylianou read in full from a copy supplied by the author; fast-follow scan dated 2026-11-18, tag created the same day. Residuals: two dicyclic relative-difference-set papers seen only in publisher preview (full text not openly accessible at the time of writing); citations of Momihara–Xiang not screened (rate limited). The residuals were stated to the author before the freeze, and the author approved the freeze and the admission with them |
| A1 claim and artifact consistency | PASS | The author approved the abstract and README introduction on 2026-11-18. Four release audits (claims, end-to-end proof, citations, reproducibility) and the later figure change; every finding and its disposition is in `audit/LEDGER.md`. The living README opens with the admitted status paragraph and the living paper carries the version DOI |
| R1 release and stewardship | PASS | See below |

## R1 — release and stewardship

| Check | Status | Evidence or residual |
|---|---|---|
| Reproduction | PASS | fresh `git archive` extraction of the draft: `make verify` 5 MATCH, `make paper` reproduces the recorded PDF hash. The candidate was rechecked with `make verify` (5 MATCH) and a deterministic `make paper` |
| Artifact integrity | PASS | `MANIFEST.sha256` covers every tracked file; two consecutive paper builds are byte-identical |
| Hygiene | PASS | whole-tree scan for private paths, emails and private repository names; README math rendered by GitHub, every span recognized |
| Stewardship | PASS | `CORRECTIONS.md` |
| Immutable semantic tag | PASS | annotated `v0.1.0` (object `64e2d55`) → `29a928f`; tagger is the GitHub noreply identity |
| Public permanent archive with provider byte identity | PASS | the pinned GitHub `zipball/v0.1.0` (downloaded twice, identical) and the Zenodo file are byte-identical: 499,860 bytes, SHA-256 `c6cc7730db0f7a41db556bfa7ef1d9f155f72b86cd602ed432f513f984202c70`; Zenodo MD5 `9ec0b438fedccf4d09b03feb49969614`; the 26 files inside pass `MANIFEST.sha256` |
| DOI resolves; living repository identifies the version | PASS | `doi.org/10.5281/zenodo.24356140` redirects to the Zenodo record; README, `CITATION.cff` and the living paper carry the version DOI |
| Archive metadata matches repository | PASS | title, creator Kline, Jeffery, version v0.1.0, publication date 2026-11-19 (UTC), license `gpl-3.0`, resource type software |
| Machine-readable citation | PASS | `CITATION.cff` with version DOI, concept DOI and `date-released: 2026-11-19` (Zenodo's date) |

**Admission verdict:** ADMITTED (2026-11-18). The P1 residual, the open
question of order 1060 and the limits stated in the README remain. No
independent human expert has reviewed the proofs.

## Archive verification

- Route: Zenodo GitHub integration; no manual deposit.
- Pinned before the GitHub Release: GitHub API `zipball/v0.1.0`, downloaded
  twice, identical, 499,860 bytes, SHA-256
  `c6cc7730db0f7a41db556bfa7ef1d9f155f72b86cd602ed432f513f984202c70`.
- Zenodo file `jeff-kline/skew-hadamard-2120-v0.1.0.zip`, downloaded through
  the record's file link: identical to the pinned zipball.
- Separate determinism check: `git archive --format=zip v0.1.0`, generated
  twice, identical, 497,106 bytes, SHA-256
  `87ffbd056bb96cd97a3a780b29a8ffe70b3b5333dc155d01c5cf12b6e1582569`. This is
  a different file from the provider zipball and is not compared with it.
- Mechanical audit at the archived state, on the unchanged tagged tree:
  11 pass, 0 warnings, 0 fail.

## External actions and owners

| Action | Owner | Status |
|---|---|---|
| Private GitHub repository and push | author authorization | done 2026-11-18 |
| Public visibility; secret scanning and push protection | author authorization | done 2026-11-18 |
| Zenodo enablement before the Release | author, in the Zenodo portal | done 2026-11-18 |
| Annotated tag `v0.1.0`, GitHub Release | author authorization (freeze bundle) | done 2026-11-19 00:12 UTC: Release "Version 0.1.0" |
| Public-site listing | author authorization (admission bundle) | landing entry "A skew Hadamard matrix of order 2,120" at <https://jeff-kline.github.io/>; Pages build and live HTML checked for title, blurb, repository link and version DOI before this record was pushed |
| Living-metadata update (this commit) | author authorization (admission bundle) | pushed after the site listing was verified live |
