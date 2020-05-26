/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'http://139.59.133.148/rest/', chainId: 'decimal-testnet' });
const wallet = new Wallet();


const txParams = {
  data: {
    creator: wallet.address,
    title: 'Sema',
    symbol: 'SEMA',
    constant_reserve_ratio: '45',
    initial_volume: '1000000000000000000',
    initial_reserve: '1000000000000000000000',
    limit_volume: '1000000000000000000000000000',
  },
  gas: '200000',
};

console.log(txParams);

(async function test() {
  // await decimal.createCoin(txParams, wallet);
}());
