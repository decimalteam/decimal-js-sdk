/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet();



(async function test() {
  const nonce = await decimal.getNonce(wallet.address);

  console.log('nonce', nonce);
}());
