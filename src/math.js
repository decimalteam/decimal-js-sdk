import DecimalNumber from 'decimal.js';

DecimalNumber.set({ precision: 40 });
export function getAmountFromUNI(amount) {
  return new DecimalNumber(amount).times(new DecimalNumber(10).pow(-18)).toFixed();
}
export function getAmountToUNI(amount) {
  return new DecimalNumber(amount).times(new DecimalNumber(10).pow(18)).toFixed(0);
}

// 36.54370379839831765129249478753748569563
// 36.543703798398320251

// 68.38725530235147775498973074507160917584
// 68.257242387741555753
