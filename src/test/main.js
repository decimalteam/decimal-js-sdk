/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');


const txParams = {
  data: {
    sender: wallet.address,
    receiver: 'dx12k95ukkqzjhkm9d94866r4d9fwx7tsd82r8pjd',
    coin: 'tDEL',
    amount: '50000000000000',
  },
  gas: '200000',
  message: ''
};

(async function test() {
  const res = await decimal.sendCoins(txParams, wallet);
  console.log(res);
}());
