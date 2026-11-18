# Admission record

**Current state:** CANDIDATE

Current verdict: NOT YET ADMITTED

**Version:** 0.1.0 (release candidate)

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
| P1 prior work and credit | PARTIAL | `audit/PRIOR-ART.md`; searches of 2026-11-18 (GitHub repos and code with a positive control, arXiv, citations of Cati–Pasechnik, the Nov 2026 survey of Egan et al.). Koukouvinos–Stylianou read in full from a copy supplied by the author. Residuals: two dicyclic relative-difference-set papers seen only in publisher preview (full text not openly accessible at the time of writing); citations of Momihara–Xiang not screened (rate limited). Repeat the fast-follow scan within 7 days before tagging |
| A1 claim and artifact consistency | PASS | The author approved the abstract and README introduction on 2026-11-18. Four release audits (claims, proof, citations, reproducibility); every finding and its disposition is in `audit/LEDGER.md` |
| R1 release and stewardship | IN PROGRESS | `make verify` (5 MATCH) and a deterministic `make paper` pass, also from a clean `git archive`; correction policy, CITATION.cff and MANIFEST.sha256 present. No tag, archive or DOI yet |
