/* eslint-disable */
import { Wallet, Decimal } from '../index';
import { options } from './data';

const mnemonic = '';

const wallet  = new Wallet(mnemonic);

const gateUrl = 'https://devnet-gate.decimalchain.com/api/';

const decimal = new Decimal({ gateUrl, wallet, });

(async () => {
  const arr = [];
  const max = 5;

  for (let i=1; i<=max; i++) arr.push(i);

  for await (const i of arr) {

  const data = {
    to: '',
    coin: 'del',
    amount: i/100 + ''
  }

  const res = await decimal.sendCoins(data, options);

  console.info({res});
  }
})();
