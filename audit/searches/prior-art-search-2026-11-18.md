# Prior-art and fast-follow search, 2026-11-18

Each search below is logged with its date and query. A failed or rate-limited
search is recorded as NOT PERFORMED, not as a negative result.

## GitHub (2026-11-18T23:31Z, `gh` CLI, authenticated)

- **Positive control:** `gh search repos Hadamard --owner vatskishan03` returned
  `vatskishan03/Hadamard`, the large public skew-matrix search corpus
  (Oct–Nov 2026). Search is working.
- `gh search repos skew hadamard`, `gh search repos skew-hadamard` and
  `gh search repos skew symmetric hadamard`, limit 50 each:
  - the author's own repositories;
  - `adrianmaciasquintero/weighing-matrices`, which builds skew matrices only by
    Paley I and doubling for orders up to 108;
  - one unrelated biometrics repository.
  None concerns order 2120 or 1060.
- `gh search code 2120 skew hadamard`, limit 30: no hit constructs order 2120.
  - `vatskishan03/Hadamard` files `skew/1528/README.md` and
    `search/negaskew/README.md` matched on other numbers.
  - `negaskew/README.md` records a search with "no shape with at most 21 orbits"
    for a list of odd parts that includes 265. That is a negative search at order
    1060, consistent with 1060 being open.
- `vatskishan03/Hadamard/skew/`, the directory listing at the latest commit
  (2026-11-06), has no entry 1060 or 2120.

## arXiv (2026-11-18, export API)

- `all:"skew Hadamard"`, sorted by submission date, 25 newest of 40 results.
  - The newest is 2610.33976 (weighing matrices, 2026-10-25).
  - No title or abstract mentions 2120, 1060, odd part 265 or $\mathbb F_{529}$.
  - Karoui 2602.16089 (order 1252 over $\mathbb F_{5^4}$) is the closest in method: a single explicit matrix from cyclotomic unions.
- Egan, Kotsireas, London and Ó Catháin, *Recent progress in the construction of
  Hadamard matrices*, arXiv:2610.27175v2 (updated 2026-11-03). Full text read
  for "skew".
  - Its Table 4 lists skew constructions: Paley I, doubling, the Spence family, orders 4n for odd n < 250, and 276 and 292.
  - The sporadic list includes a skew matrix of order 3676 (Schumer).
  - Nothing at 2120 or 1060.

## Citations of anchor sources (2026-11-18, Semantic Scholar API, no key)

- Citations of Cati–Pasechnik arXiv:2411.18897: nine papers, all from 2026.
  - The relevant ones are Egan et al. (above) and Karoui 2602.16089.
  - None gives order 2120.
- Citations of Momihara–Xiang arXiv:1801.08776: NOT PERFORMED (HTTP 429, rate limited).

## Other sources read in full or in the relevant part

- Cati–Pasechnik, arXiv:2411.18897v2, Table 5: entry 265(4).
- Đoković–Seberry, census of skew orders 4v with odd v < 2500 (PDF dated 2025-05-28): v = 265 is among the undecided cases.
- Koukouvinos–Stylianou, Discrete Math. 308 (2008), full text supplied by the author.
  - Every listed construction was checked against 2120 and 1060 (see PRIOR-ART.md).
- Momihara–Xiang, arXiv:1801.08776v2: Theorem 1.5 and Corollaries 1.6–1.7.
- Seberry–Yamada (1992), Lemma 2.4 (p. 443): the Agayan–Sarukhanyan half-product.
- Garcia, arXiv:2606.13536, Corollary 2.5: used only for a remark that is not in this release.
