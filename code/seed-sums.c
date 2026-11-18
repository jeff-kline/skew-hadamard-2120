/* Recompute the eight line sums d_0..d_7 of the paper's Section 3 for p = 7, p = 23 and p = 263,
   and check hypothesis (L): z = 1+2i has order p+1 in (K-units mod F_p-units) and z^{p+1} = 5 is a nonsquare.
   Integer arithmetic only. Independent of verify-square-field-seeds.mjs. */
#include <stdio.h>
static int eta(long a, long p) {            /* quadratic character via Euler's criterion */
  a %= p; if (a < 0) a += p; if (a == 0) return 0;
  long r = 1, b = a, e = (p - 1) / 2;
  while (e) { if (e & 1) r = r * b % p; b = b * b % p; e >>= 1; }
  return r == 1 ? 1 : -1;
}
static void run(long p, const int h[8]) {
  long n = p + 1, a = 1, b = 0;
  long re[2 * 264 + 16]; int L_ok = 1;
  for (long j = 0; j < 2 * n + 8; j++) {     /* z^j = a + b i */
    re[j] = a;
    if (j > 0 && j < n && b == 0) L_ok = 0;  /* z^j in F_p too early */
    long na = (a - 2 * b) % p, nb = (2 * a + b) % p;
    a = (na + p) % p; b = (nb + p) % p;
    if (j + 1 == n) printf("p=%ld: z^%ld = %ld + %ld i, eta = %d\n", p, n, a, b, eta(a, p));
  }
  printf("p=%ld: lines represented by z^0..z^p: %s\n", p, L_ok ? "yes" : "NO");
  long d[8], se = 0, so = 0;
  for (int c = 0; c < 8; c++) {
    long s = 0;
    for (long j = 0; j <= p; j++) {
      long q = j / 8; int sj = h[j % 8] * ((q % 2) ? -1 : 1);   /* s_j = (-1)^{floor(j/8)} h_{j mod 8} */
      s += eta(re[c + j], p) * sj;
    }
    d[c] = s; if (c % 2) so += s * s; else se += s * s;
  }
  printf("p=%ld: d = (", p);
  for (int c = 0; c < 8; c++) printf("%ld%s", d[c], c < 7 ? ", " : ")\n");
  printf("p=%ld: even sum %ld, odd sum %ld, 4p = %ld -> %s\n", p, se, so, 4 * p,
         (se == 4 * p && so == 4 * p) ? "PASS" : "FAIL");
}
int main(void) {
  const int h7[8]   = {1, 1, -1, -1, 1, -1, -1, 1};
  const int h23[8]  = {1, 1, -1, 1, 1, 1, 1, 1};
  const int h263[8] = {1, -1, -1, 1, 1, 1, 1, 1};
  run(7, h7); run(23, h23); run(263, h263);
  const int bad[8] = {1, 1, 1, 1, 1, 1, 1, 1};
  printf("control (p=23, all h=+1):\n"); run(23, bad);
  return 0;
}
