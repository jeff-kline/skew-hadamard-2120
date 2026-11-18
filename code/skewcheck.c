/* Independent skew-Hadamard checker: reads N lines of N '+'/'-' chars on stdin.
   Checks: shape, entries, diagonal +1, H_ij = -H_ji (i != j), and every unordered
   row pair orthogonal (Hamming distance exactly N/2). Bit-packed popcount. */
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
int main(int argc, char **argv) {
  int N = atoi(argv[1]);
  int W = (N + 63) / 64;
  char *M = malloc((size_t)N * N);
  uint64_t *B = calloc((size_t)N * W, 8);
  char *line = malloc(N + 8);
  for (int i = 0; i < N; i++) {
    if (!fgets(line, N + 8, stdin)) { printf("FAIL short file at row %d\n", i); return 1; }
    size_t L = strcspn(line, "\n");
    if ((int)L != N) { printf("FAIL row %d length %zu\n", i, L); return 1; }
    for (int j = 0; j < N; j++) {
      char c = line[j];
      if (c != '+' && c != '-') { printf("FAIL bad char row %d col %d\n", i, j); return 1; }
      M[(size_t)i * N + j] = c;
      if (c == '-') B[(size_t)i * W + j / 64] |= 1ULL << (j % 64);
    }
  }
  if (fgets(line, N + 8, stdin) && strcspn(line, "\n") > 0) { printf("FAIL extra data\n"); return 1; }
  long diag_bad = 0, skew_bad = 0, pair_bad = 0, pairs = 0;
  for (int i = 0; i < N; i++) {
    if (M[(size_t)i * N + i] != '+') diag_bad++;
    for (int j = i + 1; j < N; j++)
      if (M[(size_t)i * N + j] == M[(size_t)j * N + i]) skew_bad++;
  }
  for (int i = 0; i < N; i++)
    for (int k = i + 1; k < N; k++) {
      int d = 0;
      for (int w = 0; w < W; w++) d += __builtin_popcountll(B[(size_t)i * W + w] ^ B[(size_t)k * W + w]);
      pairs++;
      if (d != N / 2) pair_bad++;
    }
  printf("N=%d rows_read=%d pairs_checked=%ld nonorthogonal_pairs=%ld diagonal_not_plus=%ld skew_violations=%ld\n",
         N, N, pairs, pair_bad, diag_bad, skew_bad);
  printf("%s\n", (pair_bad || diag_bad || skew_bad) ? "RESULT: FAIL" : "RESULT: PASS (skew Hadamard: HH^T=NI, H+H^T=2I)");
  return (pair_bad || diag_bad || skew_bad) ? 1 : 0;
}
