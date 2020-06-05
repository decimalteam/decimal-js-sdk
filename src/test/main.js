/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');


(async function test() {
  console.log(wallet.address);
  const test = await decimal.getMultisig('dx1w6m5hkfwq7zy2q672ll3kmyyye8k04p8g4s5ef');
  console.log(test);
}());
