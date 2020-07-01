/* eslint-disable */
import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');


(async function test() {
  const coin = await decimal.getCoin('coin11');
  console.log(coin);
}());
