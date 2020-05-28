/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');

const txParams = {
  data: {
    buyer: wallet.address,
    coin_to_buy: 'CRT',
    coin_to_sell: 'tDEL',
    amount_to_buy: '500000',
    amount_to_sell: '100000',
  },
  gas: '200000',
  message: 'message'
};


(async function test() {
  const result = await decimal.buyCoins(txParams, wallet);
  console.log(result);
}());
