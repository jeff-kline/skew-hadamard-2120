# Admission record

**Current state:** DRAFT

Current verdict: NOT YET ADMITTED

**Version:** 0.1.0 (draft)

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
- the expansion to $4(p^{2n}+1)$ for odd $n$ (Theorem 5, Corollary 6);
- four is the minimum for all-skew families on these groups (Theorem 7).

## Gates

| Gate | Status | Evidence or residual |
|---|---|---|
| P1 prior work and credit | IN PROGRESS | `audit/PRIOR-ART.md`; searches of 2026-11-18. Residuals: two dicyclic relative-difference-set papers in preview only; citations of Momihara–Xiang not screened (rate limited) |
| A1 claim and artifact consistency | IN PROGRESS | Prose checkpoint pending the author's approval |
| R1 release and stewardship | IN PROGRESS | `make verify` and `make paper` pass locally; no tag, archive or DOI |
