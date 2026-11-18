# Prior art and credit

This is a bounded comparison with the closest known constructions. It is not a
claim of global novelty. The searches are logged in
[searches/prior-art-search-2026-11-18.md](searches/prior-art-search-2026-11-18.md).

## The order

**Claim:** we found no earlier published construction of a skew Hadamard matrix of
order $2120=2^3\cdot265$.

| Source | What it records | Bearing |
|---|---|---|
| Cati–Pasechnik, arXiv:2411.18897v2, Table 5 | $265(4)$: the least known skew order with odd part 265 is $2^4\cdot265=4240$ | The new matrix lowers the recorded exponent to at most 3 |
| Đoković–Seberry census (PDF dated 2025-05-28) | $v=265$ (order 1060) is undecided for skew matrices | A skew matrix of order 1060 would give 2120 by doubling; none was known |
| `vatskishan03/Hadamard` (latest commit 2026-11-06) | No skew entry at 1060 or 2120; a negative search at odd part 265 | Consistent |
| Egan–Kotsireas–London–Ó Catháin, arXiv:2610.27175v2 | Survey of constructions to Nov 2026; no skew matrix at 2120 or 1060 | Consistent |

## Constructions checked against 2120 and 1060

These checks are by hand, from Koukouvinos–Stylianou (2008) unless stated.

- **Paley I** (order $q+1$, $q\equiv3\bmod4$): $2119=13\cdot163$ and $1059=3\cdot353$ are not prime powers.
- **Products of prime-power-plus-one factors**, $2^t\prod k_i$ (KS Theorem 1).
  - One factor would need 2119 or 1059 to be a prime power.
  - Two factors, each $\equiv0\bmod4$, force $16\mid N$.
- **$(h-1)^u+1$** (KS Theorem 2): 2119 and 1059 are not perfect powers.
- **Szekeres difference sets**, orders $2(q+1)$ and $4(m+1)$ (KS Theorems 3–5).
  - They need $q=1059$ or $529$ with $q\equiv5\bmod8$, or $p\equiv5\bmod8$. Neither holds.
  - They supply no Szekeres sets in groups of order 1059 or 529.
- **Whiteman** (KS Theorem 8): order $q+1$, so $q=2119$, not a prime power.
- **Wallis–Whiteman** (KS Corollary 1): order $4(q+1)$ with $q=8f+1$, $f$ odd. Here $529=8\cdot66+1$, so $f$ is even.
- **Momihara–Xiang**, arXiv:1801.08776.
  - The four-block case needs a base field of order $9\bmod16$; no subfield of $\mathbb F_{23^{2n}}$ qualifies.
  - On $\mathbb F_{529}$ their Theorem 1.5 gives an eight-block family, and their matrix corollaries use two or four blocks.
- **Skew times amicable** (KS Theorem 13, order $mh$): amicable matrices of order 20 and a skew matrix of order 212 give 4240.
  - At 2120 a nontrivial product needs a skew matrix of order 1060, or forces $16\mid N$.
- **Agayan–Sarukhanyan half-product** (Seberry–Yamada 1992, Lemma 2.4).
  - The Paley matrices of orders 20 and 212 give an ordinary Hadamard matrix of order 2120.
  - As written, on skew inputs the array has trace zero, so it is not of the form $I+S$.
  - Whether some equivalent matrix is skew is not decided by this calculation; no published theorem gives that.
- **Balonin–Đoković negaperiodic product**, arXiv:1508.00640: a Golay pair of length 10 and an Ito pair of length 106 give ordinary order 2120.
  - For their published order-212 input, the skew array's symmetry condition fails at two entries.
  - Other inputs were not checked.

## Credit

- **Turyn (1971)** and **Momihara (2020)**: the cyclic matching expansion. The paper's Theorem 5 is its vector version.
- **Wallis–Whiteman** and **Momihara–Xiang**: bordered arrays; the array in Lemma 2 is a bordered Goethals–Seidel variant.
- **Lehmer (1976)**: a doubling-and-parity argument for unions of cyclotomic classes modulo a prime, close in method to Theorem 7.
- **Orrick (2008)**: the binary code and four-row products used in the inequivalence remark.
- **The author's own July 2026 search** (unpublished) first found the four masks over $\mathbb F_{529}$; it did not build the matrix.

## Residuals

- The two papers on dicyclic relative difference sets that bear on skew conference matrices were seen only in publisher preview. Their full text was not openly accessible at the time of writing.
- The papers citing Momihara–Xiang were not screened (rate limited).
- Unpublished or unindexed constructions cannot be excluded.
