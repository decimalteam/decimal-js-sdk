/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'http://139.59.133.148/rest/', chainId: 'decimal-testnet' });
const wallet = new Wallet();


// const txParams = {
//   data: {
//     seller: wallet.address,
//     coin_to_buy: 'CRT',
//     coin_to_sell: 'tDEL',
//     amount_to_buy: '500000',
//     amount_to_sell: '100000',
//   },
//   gas: '200000',
// };

(async function test() {
  // await decimal.sellCoin(txParams, wallet);
}());
