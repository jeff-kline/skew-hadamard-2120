/* Order arithmetic used in the paper, by trial division (64-bit integers).
   1. 4*49^n + 3 for n = 1, 3, 5 (the Paley I orders 4(49^n+1) at p = 7).
   2. 2119, 1059 (Paley I at orders 2120 and 1060).
   3. The next order at p = 23: 4(23^6 + 1). */
#include <stdio.h>
typedef unsigned long long u64;
static u64 least_factor(u64 n) {
  if (n % 2 == 0) return 2;
  for (u64 d = 3; d * d <= n; d += 2) if (n % d == 0) return d;
  return n;
}
static void report(const char *label, u64 n) {
  u64 f = least_factor(n);
  if (f == n) printf("%s = %llu: prime, %llu mod 4 = %llu\n", label, n, n, n % 4);
  else printf("%s = %llu: composite, %llu = %llu * %llu\n", label, n, n, f, n / f);
}
int main(void) {
  u64 q = 49;
  for (int n = 1; n <= 5; n++) {
    if (n % 2) { char lab[32]; snprintf(lab, sizeof lab, "4*49^%d+3", n); report(lab, 4 * q + 3); }
    q *= 49;
  }
  report("2119", 2119);
  report("1059", 1059);
  u64 t = 1; for (int i = 0; i < 6; i++) t *= 23;
  printf("4(23^6+1) = %llu\n", 4 * (t + 1));
  return 0;
}
