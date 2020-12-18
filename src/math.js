import DecimalNumber from 'decimal.js';

DecimalNumber.set({ precision: 40 });
export function getAmountFromUNI(amount) {
  return new DecimalNumber(amount).times(new DecimalNumber(10).pow(-18)).toFixed();
}
export function getAmountToUNI(amount) {
  return new DecimalNumber(amount).times(new DecimalNumber(10).pow(18)).toFixed(0);
}
